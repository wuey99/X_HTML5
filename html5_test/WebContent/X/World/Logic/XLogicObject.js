//==========================================================================================
(function() { var c$ = {__initializing__: false};
//==========================================================================================
var n$ = g$.namespace ("X.World.Logic");

g$.import (
		function () {
			g$.import (c$, "X.HTML5.*");
			g$.import (c$, "X.Collections.*");
			g$.import (c$, "X.Geom.*");
			g$.import (c$, "X.MVC.*");
			g$.import (c$, "X.Signals.XSignal");
			g$.import (c$, "X.Task.*");
			g$.import (c$, "X.World.*");
			g$.import (c$, "X.World.Sprite.*");
			g$.import (c$, "X.XML.XSimpleXMLNode");
			g$.import (c$, "X.XMap.*");
			g$.import (c$, "X.XML.*");
		}
	);

//------------------------------------------------------------------------------------------
// XLogicObject: Game object's that live in a "World".  These are essentially containers
// that wrap up neat-and-tidy, game logic, sprites, etc.
//
// XLogicObjects can either be instantiated dynamically from code or from an externally
// created level via a Level Manager.
//
// XLogicObjects that are created from a Level Manager are responsible for handling their
// own birth/death: XLogicObjects that stray outside the current viewport are automatically
// culled and returned back to the level.  Alternatively they can be "nuked": permanently
// removed from Level, never to return.  This system is based on Mario-like level management:
// when XLogicObjects in the Level enters the current viewPort, they are automatically spawned.
// When they leave the current viewPort (and +/- a certain threshold) they're culled. 
// They automatically get respawned when the object in the level reenters the current viewPort.
//
// When spawned, XLogicObject's can either live in the World (which is a scrollable area that
// can potentially be much larger than the current viewPort or in the HUD, which is an area
// that never scrolls.
//
// XLogicObjects can hold either XSprites or child XLogicObjects.
//------------------------------------------------------------------------------------------

//==========================================================================================
	g$.class (c$, n$, {

//==========================================================================================
	name: "XLogicObject", extend: c$.XSprite0, borrows: [c$.XRegistration_impl],
//==========================================================================================

//==========================================================================================
	properties: {
//==========================================================================================
			m_parent: null,							// XLogicObject;
			m_item: null,							// XMapItemModel;
			m_layer: 0,								// Number;
			m_depth: 0,								// Number;
			m_boundingRect: null,					// XRect;
			m_pos: null,							// XPoint;
			m_visible: false,						// Boolean;
			m_masterVisible: false,					// Boolean;
			m_relativeDepthFlag: false,				// Boolean;
			m_masterDepth: 0,						// Number;
			m_scaleX: 0,							// Number;
			m_scaleY: 0,							// Number;
			m_masterScaleX: 0,						// Number;
			m_masterScaleY: 0,						// Number;
			m_rotation: 0,							// Number;
			m_masterRotation: 0,					// Number;
			m_delayed: 0,							// Number;
			m_XLogicObjects: null,					// XDict;
			m_worldSprites: null,					// XDict;
			m_hudSprites: null,						// XDict;
			m_childSprites: null,					// XDict;
			m_detachedSprites: null,				// XDict;
			m_GUID: 0,								// Number;
			m_alpha: 0,								// Number;
			m_masterAlpha: 0,						// Number;
			m_XSignals: null,						// XDict;
			self: null,								// XLogicObject;
			m_killSignal: null,						// XSignal;
			m_XTaskSubManager: null,				// XTaskSubManager;
	
			m_iX: 0,								// Number;
			m_iY: 0,								// Number;
			m_iScale: 1,							// Number;
			m_iRotation: 0,							// Number;
			m_iItem: null,							// XMapItemModel;
			m_iLayer: 0,							// Number;
			m_iDepth: 0,							// Number;
			m_iRelativeDepth: false,				// Boolean;
			m_iClassName: null,						// String;	
	
//==========================================================================================
$: function () {} }, // end properties

//==========================================================================================
	construct:
//==========================================================================================
		function () {
			if (c$.__initializing__) return;
		
			c$.XSprite0.call (this);
			
			this.self = this;
			this.m_item = null;
			this.m_parent = null;
			this.m_boundingRect = null;
			this.m_delayed = 1;
			this.m_layer = -1;
			
			this.m_GUID = c$.g_GUID++;

			this.setRegistration ();
			
			this.iX = 0;
			this.iY = 0;
			this.iScale = 1.0;
			this.iRotation = 0.0;
			this.iItem = null;
			this.iDepth = 0;
			this.iRelativeDepth = false;
			this.iLayer = 0;
			this.iClassName = "";
		},

//==========================================================================================
	methods: {
//==========================================================================================

//------------------------------------------------------------------------------------------
		// __xxx:XWorld, args:Array
		setup: function (__xxx, /* XWorld */ args /* Array */) { // void
			this.xxx = __xxx;
						
			this.m_masterScaleX = this.m_masterScaleY = 1.0;
			this.m_masterRotation = 0;
			this.m_masterVisible = true;
			this.m_masterDepth = 0;
			this.m_masterAlpha = 1.0;
				
			this.m_XLogicObjects = new c$.XDict ();
			this.m_worldSprites = new c$.XDict ();
			this.m_hudSprites = new c$.XDict ();
			this.m_childSprites = new c$.XDict ();
			this.m_detachedSprites = new c$.XDict ();
			this.m_XSignals = new c$.XDict ();
			this.m_XTaskSubManager = new c$.XTaskSubManager (this.getXTaskManager ());

			this.m_killSignal = this.createXSignal ();
			
			this.setVisible (false);			
			this.visible = false;
			
			this.setAlpha (1.0);
			this.alpha = 1.0;
		},
	
//------------------------------------------------------------------------------------------
		setupX: function () { // void
		},
		
//------------------------------------------------------------------------------------------
		cleanup: function () { // void 
			this.removeAll ();
			
// if this item was spawned from a Level, decrement the item count and
// broadcast a "kill" signal.  it's possible for outsiders to subscribe
// to a the "kill" event.
			if (this.m_item != null) {
				this.fireKillSignal (this.m_item);
							
				this.m_item.inuse--;
				
				this.m_item = null;
			}
		},
		
//------------------------------------------------------------------------------------------
		// __listener:Function
		addKillListener: function (__listener /* Function */) { // void
			this.m_killSignal.addListener (__listener);
		},
		
//------------------------------------------------------------------------------------------
		// __model:XModelBase
		fireKillSignal: function (__model /* XModelBase */) { // void
			this.m_killSignal.fireSignal (__model);
		},
		
//------------------------------------------------------------------------------------------
// kill this object and remove it from the World (delayed)
//------------------------------------------------------------------------------------------
		killLater: function () { // void
			this.xxx.getXLogicManager ().killLater (this);
		},
				
//------------------------------------------------------------------------------------------
// kill this object and remove it from the World (now)
//------------------------------------------------------------------------------------------
		kill: function () { // void
			this.xxx.getXLogicManager ().killLater (this);
		},
			
//------------------------------------------------------------------------------------------
		removeAll: function () { // void 
			this.removeAllWorldSprites ();
			this.removeAllHudSprites ();
			this.removeAllXLogicObjects ();
			this.removeAllXSignals ();
			this.removeAllTasks ();
			
			if (this.getParent () != null) {
				this.getParent ().removeXLogicObject0 (this);
			}
		},
		
//------------------------------------------------------------------------------------------
// cull this object if it strays outside the current viewPort
//------------------------------------------------------------------------------------------	
		cullObject: function () { // void
// if this object wasn't ever spawned from a level, don't perform any culling
			if (this.m_item == null) {
				return;
			}
					
// determine whether this object is outside the current viewPort
			var v /* XRect */ = this.xxx.getXMapModel ().getViewRect ();
						
			var r /* XRect */ = this.xxx.getXWorldLayer (this.m_layer).viewPort (v.width, v.height);
			r.inflate (256, 256);

			var i; /* XRect */
								
			i = this.m_item.boundingRect.cloneX ();
			i.offsetPoint (this.getPos ());
					
			if (r.intersects (i)) {
				return;
			}
					
			i = m_boundingRect.cloneX ();
			i.offsetPoint (this.getPos ());
					
			if (r.intersects (i)) {
				return;
			}
					
// yep, kill it
			g$.trace (": ---------------------------------------: ");
			g$.trace (": cull: ", this);
					
			this.killLater ();
		},
				
//------------------------------------------------------------------------------------------
		// __parent:XLogicObject
		setParent: function (__parent /* XLogicObject */) { // void
			this.m_parent = __parent;
		},
		
//------------------------------------------------------------------------------------------
		getParent: function () { // XLogicObject
			return this.m_parent;
		},
		
//------------------------------------------------------------------------------------------
// TBD:
//
// the original method was designed to find a child MovieClip with a .FLA resource.
// is there a use for this in HTML5?
//------------------------------------------------------------------------------------------	
		// __movieClip:MovieClip,
		// __className:String
		findMovieClipByName: function (
			__movieClip, /* MovieClip */
			__className /* String */
			) { // MovieClip
		
			return null;
		},
	
//------------------------------------------------------------------------------------------
// TBD:
//
// the original method was designed to find a child MovieClip with a .FLA resource.
// is there a use for this in HTML5?
//------------------------------------------------------------------------------------------
		// __movieClip:MovieClip,
		// __className:String
		findClassByName: function  (
			__movieClip, /* MovieClip */
			__className /* String */
			) { // *
			
			return null;
		},

//------------------------------------------------------------------------------------------
// TBD:
//
// the original method was designed to find a child MovieClip with a .FLA resource.
// is there a use for this in HTML5?
//------------------------------------------------------------------------------------------
		// __movieClip:MovieClip,
		// __className:String
		findTextFieldByName: function (
			__movieClip, /* MovieClip */
			__className /* String */
			) { // TextField
	
			return null;
		},
		
//------------------------------------------------------------------------------------------
		// __obj:XLogicObject, __pos:XPoint
		localToGlobalX: function (__obj, /* XLogicObject */ __pos /* XPoint */) { // XPoint
			return null;
		},
		
//------------------------------------------------------------------------------------------
		// __obj:XLogicObject, __pos:XPoint
		globalToLocalX: function (__obj, /* XLogicObject */ __pos /* XPoint */) { // XPoint
			return null;
		},
		
//------------------------------------------------------------------------------------------
// get a map of all our child sprites that live in the World
//------------------------------------------------------------------------------------------	
		getSprites: function () { // XDict
			return this.m_worldSprites;
		},
				
//------------------------------------------------------------------------------------------	
		sprites: function () { // XDict
			return this.m_worldSprites;
		},
	
//------------------------------------------------------------------------------------------
// get a map of all our child sprites that live in the HUD
//------------------------------------------------------------------------------------------	
		getHudSprites: function () { // XDict
			return this.m_hudSprites;
		},
				
//------------------------------------------------------------------------------------------
// get a map of all the our child XLogicObjects
//------------------------------------------------------------------------------------------	
		getXLogicObjects: function () { // XDict
			return this.m_XLogicObjects;
		},
				
//------------------------------------------------------------------------------------------
// add sprite to another sprite
//------------------------------------------------------------------------------------------
		// __sprite:Sprite,
		// __sprite2:Sprite,
		// __dx:Number, __dy:Number
		addDetachedSprite: function (
			__sprite, /* Sprite */
			__sprite2, /* Sprite */
			__dx, /* Number */ __dy /* Number */
			) { // void
			
			__sprite2.addChild (__sprite);
					
			__sprite.x = -__dx;
			__sprite.y = -__dy;
					
			this.m_detachedSprites.put (__sprite, __sprite2);
		},
		
//------------------------------------------------------------------------------------------
// add sprite to another sprite
//------------------------------------------------------------------------------------------
		// __sprite:Sprite,
		// __sprite2:Sprite,
		// __dx:Number, __dy:Number
		addChildSprite: function (
			__sprite, /* Sprite */
			__sprite2, /* Sprite */
			__dx, /* Number */ __dy /* Number */
			) { // void
			
			__sprite2.addChild (__sprite);
					
			__sprite.x = -__dx;
			__sprite.y = -__dy;
					
			this.m_childSprites.put (__sprite, __sprite2);
		},
				
//------------------------------------------------------------------------------------------
// add a sprite the World
//------------------------------------------------------------------------------------------
		// __sprite:Sprite
		addSprite: function (__sprite /* Sprite */) { // XDepthSprite
			return this.addSpriteAt (__sprite, 0, 0);
		},
		
//------------------------------------------------------------------------------------------
		//__sprite:DisplayObject,
		// __dx:Number, __dy:Number,
		//__relative:Boolean = false
		addSpriteAt: function (
			__sprite, /* DisplayObject */
			__dx, /* Number */ __dy, /* Number */
			__relative /* Boolean = false */
			) { // XDepthSprite
				
			__relative = __relative ? __relative : false;
			
			var __depthSprite; /* XDepthSprite */
			
			if (__relative || this.getRelativeDepthFlag ()) {
				__depthSprite = this.xxx.getXWorldLayer (this.m_layer).addSprite (__sprite, 0);
				__depthSprite.setRelativeDepthFlag (true);				
			}
			else
			{
				__depthSprite = this.xxx.getXWorldLayer (this.m_layer).addSprite (__sprite, this.getDepth ());
			}
				
			__depthSprite.setRegistration (__dx, __dy);
			
			this.m_worldSprites.put (__depthSprite, 0);
			
			return __depthSprite;
		},
		
//------------------------------------------------------------------------------------------
// remove a sprite from the World
//------------------------------------------------------------------------------------------
		// __sprite:Sprite
		removeSprite: function (__sprite /* Sprite */) { // void
			if (this.m_worldSprites.exists (__sprite)) {
				this.m_worldSprites.remove (__sprite);
						
				this.xxx.getXWorldLayer (m_layer).removeSprite (__sprite);
			}
		},
				
//------------------------------------------------------------------------------------------
		removeAllWorldSprites: function () { // void
			this.m_worldSprites.forEach (
				function (x) { // void
					this.removeSprite (x);
				}.bind (this)
			);
		},
		
//------------------------------------------------------------------------------------------
// add a sprite to the HUD
//------------------------------------------------------------------------------------------
		// __sprite:Sprite
		addSpriteToHud: function (__sprite /* Sprite */) { // XDepthSprite
			return this.addSpriteToHudAt (__sprite, 0, 0);
		},
	
//------------------------------------------------------------------------------------------
		// __sprite:Sprite,
		// __dx:Number, __dy:Number,
		//__relative:Boolean = false
		addSpriteToHudAt: function (
			__sprite, /* Sprite */
			__dx, /* Number */ __dy, /* Number */
			__relative /* Boolean = false */
			) { // XDepthSprite {
				
			__relative = __relative ? __relative : false;
			
			var __depthSprite; /* XDepthSprite */
			
			if (__relative || this.getRelativeDepthFlag ()) {
				__depthSprite = this.xxx.getXHudLayer ().addSprite (__sprite, 0);
				__depthSprite.setRelativeDepthFlag (true);				
			}
			else
			{
				__depthSprite = this.xxx.getXHudLayer ().addSprite (__sprite, this.getDepth ());
			}
							
			__depthSprite.setRegistration (__dx, __dy);
			
			this.m_hudSprites.put (__depthSprite, 0);
			
			return __depthSprite;
		},
	
//------------------------------------------------------------------------------------------
// remove a sprite from the HUD
//------------------------------------------------------------------------------------------
		// __sprite:Sprite
		removeSpriteFromHud: function (__sprite /* Sprite */) { // void
			if (this.m_hudSprites.exists (__sprite)) {
				this.m_hudSprites.remove (__sprite);
						
				this.xxx.getXHudLayer ().removeSprite (__sprite);
			}
		},
				
//------------------------------------------------------------------------------------------
		removeAllHudSprites: function () { // void
			this.m_hudSprites.forEach (
				function (x) { // void
					this.removeSpriteFromHud (x);
				}.bind (this)
			);
		},
				
//------------------------------------------------------------------------------------------
// add an XLogicObject to the World
//------------------------------------------------------------------------------------------
		// __XLogicObject:XLogicObject
		addXLogicObject: function (__XLogicObject /* XLogicObject */) { // XLogicObject
			this.m_XLogicObjects.put (__XLogicObject, 0);
					
			return __XLogicObject;
		},
				
//------------------------------------------------------------------------------------------
// remove an XLogicObject from the World
//------------------------------------------------------------------------------------------
		// __XLogicObject:XLogicObject
		removeXLogicObject: function (__XLogicObject /* XLogicObject */) { // void
			if (this.m_XLogicObjects.exists (__XLogicObject)) {
				this.m_XLogicObjects.remove (__XLogicObject);
						
				__XLogicObject.cleanup ();
			}
		},
				
//------------------------------------------------------------------------------------------
// remove an XLogicObject from the World but don't kill it
//------------------------------------------------------------------------------------------
		// __XLogicObject:XLogicObject
		removeXLogicObject0: function (__XLogicObject /* XLogicObject */) { // void
			if (this.m_XLogicObjects.exists (__XLogicObject)) {
				this.m_XLogicObjects.remove (__XLogicObject);
			}
		},
				
//------------------------------------------------------------------------------------------
		removeAllXLogicObjects: function () { // void
			this.m_XLogicObjects.forEach (
				function (x) { // void
					this.removeXLogicObject (x);
				}.bind (this)
			);
		},
				
//------------------------------------------------------------------------------------------
// not implemented: XLogicObjects that are spawned from a level can contain intialization
// parameters
//------------------------------------------------------------------------------------------	
		getDefaultParams: function () { // XSimpleXMLNode
			return null;
		},
				
//------------------------------------------------------------------------------------------
		// _item:XMapItemModel
		setItem: function (__item /* XMapItemModel */) { // void
			this.m_item = __item;
			
			if (this.m_item != null) {
				this.m_boundingRect = __item.boundingRect.cloneX ();
			}
		},
		
//------------------------------------------------------------------------------------------
		// __layer:Number
		setLayer: function (__layer /* Number */) { // void
			if (__layer != this.m_layer && this.m_layer != -1) {
				this.m_worldSprites.forEach (
					function (x) { // void {
						this.xxx.getXWorldLayer (this.m_layer).removeSprite (x);
						this.xxx.getXWorldLayer (__layer).addDepthSprite (x);
					}
				);
			}
			
			this.m_layer = __layer;
		},

//------------------------------------------------------------------------------------------
		setValues: function () { // void 
			this.setRegistration (-this.getPos ().x, -this.getPos ().y);
		},
		
//------------------------------------------------------------------------------------------
		// __args:Array, i:Number
		getArg: function (__args, /* Array */ i /* Number */) { // *
			return __args[i];
		},
	
//------------------------------------------------------------------------------------------
		// __pos:XPoint
		setPos: function (__pos /* XPoint */) { // void
			this.m_pos = __pos;
		},
		
//------------------------------------------------------------------------------------------
		getPos: function () { // XPoint
			return this.m_pos;
		},
		
//------------------------------------------------------------------------------------------
		// __alpha:Number
		setAlpha: function (__alpha /* Number */) { // void
			this.m_alpha = __alpha;
		},
		
//------------------------------------------------------------------------------------------
		getAlpha: function () { // Number
			return this.m_alpha;
		},
		
//------------------------------------------------------------------------------------------
		// __alpha:Number
		setMasterAlpha: function (__alpha /* Number */) { // void
			this.m_masterAlpha = __alpha;
		},
		
//------------------------------------------------------------------------------------------		
		getMasterAlpha: function () { // Number
			return this.m_masterAlpha;
		},
		
//------------------------------------------------------------------------------------------
		// __value:Boolean
		setVisible: function (__value /* Boolean */) { // void
			this.m_visible = __value;
		},
		
//------------------------------------------------------------------------------------------
		getVisible: function () { // Boolean 
			return this.m_visible;
		},
		
//------------------------------------------------------------------------------------------	
		// __visible:Boolean
		setMasterVisible: function (__visible /* Boolean */) { // void
			this.m_masterVisible = __visible;
		},
		
//------------------------------------------------------------------------------------------		
		getMasterVisible: function () { // Boolean 
			return this.m_masterVisible;
		},
		
//------------------------------------------------------------------------------------------
		// __rotation:Number
		setRotation: function (__rotation /* Number */) { // void
			this.m_rotation = __rotation % 360;
		},
		
//------------------------------------------------------------------------------------------		
		getRotation: function () { // Number
			return this.m_rotation;
		},
		
//------------------------------------------------------------------------------------------
		// __rotation:Number
		setMasterRotation: function (__rotation /* Number */) { // void 
			this.m_masterRotation = __rotation % 360;
		},
		
//------------------------------------------------------------------------------------------		
		getMasterRotation: function () { // Number
			return this.m_masterRotation;
		},
		
//------------------------------------------------------------------------------------------
		// __scale:Number
		setScale: function (__scale /* Number */) { // void
			this.m_scaleX  = this.m_scaleY = __scale;
		},
		
//------------------------------------------------------------------------------------------
		getScale: function () { // Number
			return this.m_scaleX;
		},
		
//------------------------------------------------------------------------------------------
		// __scale:Number
		setScaleX: function (__scale /* Number */) { // void
			this.m_scaleX = __scale;
		},
		
//------------------------------------------------------------------------------------------
		getScaleX: function () { // Number
			return this.m_scaleX;
		},
		
//------------------------------------------------------------------------------------------
		// __scale:Number
		setScaleY: function (__scale /* Number */) { // void
			this.m_scaleY = __scale;
		},
		
//------------------------------------------------------------------------------------------
		getScaleY: function () { // Number
			return this.m_scaleY;
		},
		
//------------------------------------------------------------------------------------------
		// __scale:Number
		setMasterScaleX: function (__scale /* Number */) { // void
			this.m_masterScaleX = __scale;
		},
		
//------------------------------------------------------------------------------------------		
		getMasterScaleX: function () { // Number
			return this.m_masterScaleX;
		},
		
//------------------------------------------------------------------------------------------
		// __scale:Number
		setMasterScaleY: function (__scale /* Number */) { // void
			this.m_masterScaleY = __scale;
		},
		
//------------------------------------------------------------------------------------------		
		getMasterScaleY: function () { // Number
			return this.m_masterScaleY;
		},
		
//------------------------------------------------------------------------------------------
		// __depth:Number
		setDepth: function (__depth /* Number */) { // void
			this.m_depth = __depth;
		},
		
//------------------------------------------------------------------------------------------	
		getDepth: function () { // Number
			return this.m_depth;
		},
		
//------------------------------------------------------------------------------------------
		// __depth:Number
		setMasterDepth: function (__depth /* Number */) { // void
			this.m_masterDepth = __depth;
		},
		
//------------------------------------------------------------------------------------------		
		getMasterDepth: function () { // Number
			return this.m_masterDepth;
		},
		
//------------------------------------------------------------------------------------------
		// __relative:Boolean
		setRelativeDepthFlag: function (__relative /* Boolean */) { // void
			this.m_relativeDepthFlag = __relative;
		},
		
//------------------------------------------------------------------------------------------
		getRelativeDepthFlag: function () { // Boolean 
			return this.m_relativeDepthFlag;
		},

//------------------------------------------------------------------------------------------
// the function updates all the children that live inside the XLogicObject container
//
// children in the XLogicObject sense aren't DisplayObject children.  This is done
// so that the depth sorting on each child can be controlled explicitly.
//------------------------------------------------------------------------------------------	
		updateDisplay: function () { // void
			if (this.m_delayed) {
				this.m_delayed--;
						
				return;
			}

//------------------------------------------------------------------------------------------			
			var i; // *

			var __x /* Number */ = this.x;
			var __y /* Number */ = this.y;
			var __visible /* Boolean */ = this.getMasterVisible ();
			var __scaleX /* Number */ = this.getMasterScaleX ();
			var __scaleY /* Number */ = this.getMasterScaleY ();
			var __rotation /* Number */ = this.getMasterRotation ();
			var __depth /* Number */ = this.getMasterDepth ();
			var __alpha /* Number */ = this.getMasterAlpha ();
					
//------------------------------------------------------------------------------------------
			var logicObject; /* XLogicObject */
					
// update children XLogicObjects
			this.m_XLogicObjects.forEach (
				function (i) { // void
					logicObject = i; /* as XLogicObject */
									
					if (logicObject != null) {	
						logicObject.x2 = __x
						logicObject.y2 = __y
						logicObject.rotation2 = __rotation;
						logicObject.visible = __visible;
						logicObject.scaleX2 = __scaleX;
						logicObject.scaleY2 = __scaleY;
						logicObject.alpha = __alpha;
								
						// propagate rotation, scale, visibility, alpha
						logicObject.setMasterRotation (logicObject.getRotation () + __rotation);
						logicObject.setMasterScaleX (logicObject.getScaleX () * __scaleX);
						logicObject.setMasterScaleY (logicObject.getScaleY () * __scaleY);
						logicObject.setMasterVisible (logicObject.getVisible () && __visible);
						if (logicObject.getRelativeDepthFlag ()) {
							logicObject.setMasterDepth (logicObject.getDepth () + __depth);
						}
						else
						{
							logicObject.setMasterDepth (logicObject.getDepth ())
						}
						logicObject.setMasterAlpha (logicObject.getAlpha () * __alpha);
								
						logicObject.updateDisplay ();
					}
				}.bind (this)
			);
					
//------------------------------------------------------------------------------------------
			var sprite; /* XDepthSprite */

// update child sprites that live as children of the Sprite
			this.m_childSprites.forEach (
				function (i) { // void
				}.bind (this)
			);
										
// update child sprites that live in the World
			this.m_worldSprites.forEach (
				function (i) { // void
					sprite = i; /* as XDepthSprite */
							
					if (sprite != null) {
						sprite.x2 = __x;
						sprite.y2 = __y;
						sprite.rotation2 = __rotation;
						sprite.visible = sprite.visible2 && __visible;
						if (sprite.relativeDepthFlag) {
							sprite.depth2 = sprite.depth + __depth;
						}
						else
						{
							sprite.depth2 = sprite.depth;
						}
						sprite.scaleX2 = __scaleX;
						sprite.scaleY2 = __scaleY;
						sprite.alpha = __alpha;
					}
				}.bind (this)
			);
					
// update child sprites that live in the HUD
			this.m_hudSprites.forEach (
				function (i) { // void
					sprite = i; / * as XDepthSprite */
							
					if (sprite != null) {
						sprite.x2 = __x;
						sprite.y2 = __y;
						sprite.rotation2 = __rotation;
						sprite.visible = sprite.visible2 && __visible;
						if (sprite.relativeDepthFlag) {
							sprite.depth2 = sprite.depth + __depth;
						}
						else
						{
							sprite.depth2 = sprite.depth;
						}
						sprite.scaleX2 = __scaleX;
						sprite.scaleY2 = __scaleY;
						sprite.alpha = __alpha;
					}
				}.bind (this)
			);
		},

//------------------------------------------------------------------------------------------
		createXSignal: function () { // XSignal
			var __signal /* XSignal */ = this.xxx.getXSignalManager ().createXSignal ();
		
			if (!(this.m_XSignals.exists (__signal))) {
				this.m_XSignals.put (__signal, 0);
			}
			
			__signal.setParent (this);
			
			return __signal;
		},


//------------------------------------------------------------------------------------------
		//__signal:XSignal
		removeXSignal: function (__signal /* XSignal */) { // void
			if (this.m_XSignals.exists (__signal)) {
				this.m_XSignals.remove (__signal);
							
				this.xxx.getXSignalManager ().removeXSignal (__signal);
			}
		},
				
//------------------------------------------------------------------------------------------
		removeAllXSignals: function () { // void
			this.m_XSignals.forEach (
				function (x) { // void
					this.removeXSignal (x /* as XSignal */);
				}.bind (this)
			);
		},
		
//------------------------------------------------------------------------------------------
		getXTaskManager: function () { // XTaskManager
			return this.xxx.getXTaskManager ();
		},
		
//------------------------------------------------------------------------------------------
		// __taskList:Array,
		//__findLabelsFlag:Boolean = true
		addTask: function (
			__taskList, /* Array */
			__findLabelsFlag /* Boolean = true */
			) { // XTask

			__findLabelsFlag = __findLabelsFlag ? __findLabelsFlag : true;
			
			var __task /* XTask */ = this.m_XTaskSubManager.addTask (__taskList, __findLabelsFlag);
			
			__task.setParent (this);
			
			return __task;
		},
		
//------------------------------------------------------------------------------------------
		// __task:XTask,
		// __taskList:Array,
		// __findLabelsFlag:Boolean = true
		changeTask: function (
			__task, /* XTask */
			__taskList, /* Array */
			__findLabelsFlag /* Boolean = true */
			) { // XTask
				
			__findLabelsFlag = __findLabelsFlag ? __findLabelsFlag : true;
			
			return this.m_XTaskSubManager.changeTask (__task, __taskList, __findLabelsFlag);
		},
		
//------------------------------------------------------------------------------------------
		// __task:XTask
		isTask: function (__task /* XTask */) { // Boolean
			return this.m_XTaskSubManager.isTask (__task);
		},		
		
//------------------------------------------------------------------------------------------
		// __task:XTask
		removeTask: function (__task /* XTask */) { // void
			this.m_XTaskSubManager.removeTask (__task);	
		},

//------------------------------------------------------------------------------------------
		removeAllTasks: function () { // void
			this.m_XTaskSubManager.removeAllTasks ();
		},
		
//------------------------------------------------------------------------------------------
		addEmptyTask: function () { // XTask
			return this.m_XTaskSubManager.addEmptyTask ();
		},
		
//------------------------------------------------------------------------------------------
		getEmptyTask$: function () { // Array
			return this.m_XTaskSubManager.getEmptyTask$ ();
		},
			
//------------------------------------------------------------------------------------------
		// __logic:Function
		gotoLogic: function (__logic /* Function */) { // void
			this.m_XTaskSubManager.gotoLogic (__logic);
		},
		
//------------------------------------------------------------------------------------------
		updateLogic: function () { // void
		},

//------------------------------------------------------------------------------------------
		updatePhysics: function () { // void
		},
		
//------------------------------------------------------------------------------------------	
		createSprites: function () { // void
		},
		
//------------------------------------------------------------------------------------------
		show: function () { // void
			this.setVisible (true);
		},
		
//------------------------------------------------------------------------------------------
		hide: function () { // void
			this.setVisible (false);
		},

//==========================================================================================
$: function () {} }, // end methods

//==========================================================================================
accessors: {
//==========================================================================================
	
//------------------------------------------------------------------------------------------
	oScaleY: {
		get: function () { // Number
			return this.getScaleY ();
		},
		
		set: function (__value) {
			this.setScaleY (__value);
		}
	},
	
//------------------------------------------------------------------------------------------
	oScaleX: {
		get: function () { // Number
			return this.getScaleX ();
		},
		
		set: function (__value) {
			this.setScaleX (__value);
		}
	},
	
//------------------------------------------------------------------------------------------
	oScale: {
		get: function () { // Number
			return this.getScale ();
		},
		
		set: function (__value) {
			this.setScale (__value);
		}
	},
	
//------------------------------------------------------------------------------------------
	oRotation: {
		get: function () { // Number
			return this.getRotation ();
		},
		
		set: function (__value) {
			this.setRotation (__value);
		}
	},
	
//------------------------------------------------------------------------------------------
	visible: {
		get: function () { // Boolean
			return this.m_visible;
		},
		
		set: function (__value) {
			this.setVisible (__value);
		}
	},
	
//------------------------------------------------------------------------------------------
	alpha: {
		get: function () { // Number
			return this.getAlpha ();
		},
		
		set: function (__value) {
			this.setAlpha (__value);
		}
	},
	
//------------------------------------------------------------------------------------------
	oX: {
		get: function () { // Number
			return this.getPos ().x
		},
		
		set: function (__value) {
			var __pos /* XPoint */ = this.getPos ();
			__pos.x = __value;
			this.setPos (__pos);
		}
	},

//------------------------------------------------------------------------------------------
	oY: {
		get: function () { // Number
			return this.getPos ().y
		},
		
		set: function (__value) {
			var __pos /* XPoint */ = this.getPos ();
			__pos.y = __value;
			this.setPos (__pos);
		}
	},
	
//------------------------------------------------------------------------------------------
	o: {
		get: function () { // Object
			return this;
		},
		
		set: function (__value) {
		}
	},
	
//------------------------------------------------------------------------------------------
// initializer setters
//
// for use by createXLogicObjectFromXML
//------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------
	iX: {
		get: function () { // Number
			return this.m_iX;
		},
		
		set: function (__value) {
			this.m_iX = __value;
		}
	},

//------------------------------------------------------------------------------------------
	iY: {
		get: function () { // Number
			return this.m_iY;
		},
		
		set: function (__value) {
			this.m_iY = __value;
		}
	},

//------------------------------------------------------------------------------------------
	iScale: {
		get: function () { // Number
			return this.m_iScale;
		},
		
		set: function (__value) {
			this.m_iScale = __value;
		}
	},
	
//------------------------------------------------------------------------------------------
	iRotation: {
		get: function () { // Number
			return this.m_iRotation;
		},
		
		set: function (__value) {
			this.m_iRotation = __value;
		}
	},

//------------------------------------------------------------------------------------------
	iItem: {
		get: function () { // XMapItemModel
			return this.m_iItem;
		},
		
		set: function (__value) {
			this.m_iItem = __value;
		}
	},
	
//------------------------------------------------------------------------------------------
	iLayer: {
		get: function () { // Number
			return this.m_iLayer;
		},
		
		set: function (__value) {
			this.m_iLayer = __value;
		}
	},
	
//------------------------------------------------------------------------------------------
	iDepth: {
		get: function () { // Number
			return this.m_iDepth;
		},
		
		set: function (__value) {
			this.m_iDepth = __value;
		}
	},
	
//------------------------------------------------------------------------------------------
	iRelativeDepth: {
		get: function () { // Boolean
			return this.m_iRelativeDepth;
		},
		
		set: function (__value) {
			this.m_iRelativeDepth = __value;
		}
	},
	
//------------------------------------------------------------------------------------------
	iClassName: {
		get: function () { // String
			return this.m_iClassName;
		},
		
		set: function (__value) {
			this.m_iClassName = __value;
		}
	},
	
//==========================================================================================
$: {} }, // end accessors

//==========================================================================================
statics: {
//==========================================================================================
		g_GUID: 0,							// Number = 0;
	
//==========================================================================================
$: function () {} }, // end statics

//==========================================================================================
end: []
//==========================================================================================
	});
			
//==========================================================================================
}());