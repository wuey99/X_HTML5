//==========================================================================================
(function() { var c$ = {__initializing__: false};
//==========================================================================================
var n$ = g$.namespace ("X.World");
	
g$.import (
		function () {
			g$.import (c$, "X.*");
			g$.import (c$, "X.Collections.*");
			g$.import (c$, "X.Geom.*");
			g$.import (c$, "X.World.Logic.*");
			g$.import (c$, "X.World.Sprite.*");
			g$.import (c$, "X.XMap.*");
		}
	);

//==========================================================================================
	g$.class (c$, n$, {

//==========================================================================================
	name: "XLogicManager", extend: Object, borrows: [],
//==========================================================================================

//==========================================================================================
	properties: {
//==========================================================================================
		xxx: null,							// XWorld;
		m_XLogicObjects: null,				// XDict;
		m_XLogicObjectsTopLevel: null,		// XDict;
		m_killQueue: null,					// Array;
	
//==========================================================================================
$: function () {} }, // end properties

//==========================================================================================
	construct:
//==========================================================================================
		// __xxx:XWorld
		function (__xxx /* XWorld */) {
			if (c$.__initializing__) return;
		
//			Object.call (this);
		
			this.xxx = __xxx;
			
			this.m_XLogicObjects = new c$.XDict ();
			this.m_XLogicObjectsTopLevel = new c$.XDict ();
			
			this.m_killQueue = new Array ();
		},

//==========================================================================================
	methods: {
//==========================================================================================

//------------------------------------------------------------------------------------------
		setup: function () { // void
		},
		
//------------------------------------------------------------------------------------------
		cleanup: function () { // void
		},

//------------------------------------------------------------------------------------------
		// __parent:XLogicObject,
		// __className:String,
		// __item:XMapItemModel, __layer:Number, __depth:Number,
		// __x:Number, __y:Number, __z:Number, 
		// __scale:Number, __rotation:Number,
		// ...args
		createXLogicObjectFromClassName: function (
			__parent, /* XLogicObject */
			__className, /* String */
			__item, /* XMapItemModel */ __layer, /* Number */ __depth, /* Number */
			__x, /* Number */ __y, /* Number */ __z, /* Number */
			__scale, /* Number */ __rotation /* Number */
			/* args: Array */
			) { // XLogicObject
				
			var args = arguments.length > 10 ? Array.prototype.slice.call (arguments, 10) : []; 
			
			var __class /* Class */ = this.xxx.getClass (__className);
			
			var __logicObject /* XLogicObject */ = new (__class) (); /* as XLogicObject */
				
			return this.__initXLogicObject (
				__parent,
				__logicObject,
				__item, __layer, __depth,
				__x, __y, __z,
				__scale, __rotation,
				args);
		},
		
//------------------------------------------------------------------------------------------
		// __parent:XLogicObject,
		// __logicObject:XLogicObject,
		// ...args
		initXLogicObjectFromXML: function (
			__parent, /* XLogicObject */
			__logicObject /* XLogicObject */
			/* args: Array */
			) { // XLogicObject
				
			var args = arguments.length > 2 ? Array.prototype.slice.call (arguments, 2) : []; 
			
			if (__logicObject.iClassName != "") {
				return this.__initXLogicObject (
						__parent,
						__logicObject,
						__logicObject.iItem, __logicObject.iLayer, __logicObject.iDepth,
						__logicObject.iX, __logicObject.iY, 0,
						__logicObject.iScale, __logicObject.iRotation,
						[__logicObject.iClassName]);				
			}
			else
			{
				return this.__initXLogicObject (
						__parent,
						__logicObject,
						__logicObject.iItem, __logicObject.iLayer, __logicObject.iDepth,
						__logicObject.iX, __logicObject.iY, 0,
						__logicObject.iScale, __logicObject.iRotation,
						args);
			}
		},

//------------------------------------------------------------------------------------------
		// __parent:XLogicObject,
		// __logicObject:XLogicObject,
		// __item:XMapItemModel, __layer:Number, __depth:Number,
		// __x:Number, __y:Number, __z:Number, 
		// __scale:Number, __rotation:Number,
		// ...args
		initXLogicObject: function (
			__parent, /* XLogicObject */
			__logicObject, /* XLogicObject */
			__item, /* XMapItemModel */ __layer, /* Number */ __depth, /* Number */
			__x, /* Number */ __y, /* Number */ __z, /* Number */
			__scale, /* Number */ __rotation /* Number */
			/* args: Array */
			) { // XLogicObject

			var args = arguments.length > 9 ? Array.prototype.slice.call (arguments, 9) : []; 
			
			return this.__initXLogicObject (
					__parent,
					__logicObject,
					__item, __layer, __depth,
					__x, __y, __z,
					__scale, __rotation,
					args
				);
		},
		
//------------------------------------------------------------------------------------------
		// __parent:XLogicObject,
		// __logicObject:XLogicObject,
		// __item:XMapItemModel, __layer:Number, __depth:Number, __relative:Boolean,
		// __x:Number, __y:Number, __z:Number, 
		// __scale:Number, __rotation:Number,
		// ...args
		initXLogicObjectRel: function (
			__parent, /* XLogicObject */
			__logicObject, /* XLogicObject */
			__item, /* XMapItemModel */ __layer, /* Number */ __depth, /* Number */ __relative, /* Boolean */
			__x, /* Number */ __y, /* Number */ __z, /* Number */
			__scale, /* Number */ __rotation /* Number */
			/* args: Array */
			) { // XLogicObject
				
			var args = arguments.length > 11 ? Array.prototype.slice.call (arguments, 11) : []; 
			
			return this.__initXLogicObjectRel (
					__parent,
					__logicObject,
					__item, __layer, __depth, __relative,
					__x, __y, __z,
					__scale, __rotation,
					args
				);
		},
		
//------------------------------------------------------------------------------------------
		// __parent:XLogicObject,
		// __logicObject:XLogicObject,
		// __item:XMapItemModel, __layer:Number, __depth:Number,
		// __x:Number, __y:Number, __z:Number, 
		// __scale:Number, __rotation:Number,
		// args:Array
		__initXLogicObject: function (
			__parent, /* XLogicObject */
			__logicObject, /* XLogicObject */
			__item, /* XMapItemModel */ __layer, /* Number */ __depth, /* Number */
			__x, /* Number */ __y, /* Number */ __z, /* Number */ 
			__scale, /* Number */ __rotation, /* Number */
			args /* Array */
			) { // XLogicObject

			this.xxx.addChild (__logicObject);
			
			__logicObject.setDepth (__depth);
			__logicObject.setRelativeDepthFlag (false);
			__logicObject.setLayer (__layer);
									
			g$.trace (": XLogicManager:init: ", __logicObject, args.length, args);
							
			__logicObject.setup (this.xxx, args);

			__logicObject.setItem (__item);
			__logicObject.setPos (new c$.XPoint (__x, __y));			
//			__logicObject.setLayer (__layer);
//			__logicObject.setDepth (__depth);
			__logicObject.setScale (__scale);
			__logicObject.setRotation (__rotation);
			__logicObject.setParent (__parent);
			
			__logicObject.setupX ();
						
//			this.xxx.addChild (__logicObject);
			
			this.m_XLogicObjects.put (__logicObject, 0);
			
			if (__parent == null) {
				this.m_XLogicObjectsTopLevel.put (__logicObject, 0);
			}
			
			return __logicObject;
		},
		
//------------------------------------------------------------------------------------------
		// __parent:XLogicObject,
		// __logicObject:XLogicObject,
		// __item:XMapItemModel, __layer:Number, __depth:Number, __relative:Boolean,
		// __x:Number, __y:Number, __z:Number, 
		// __scale:Number, __rotation:Number,
		// args:Array
		__initXLogicObjectRel: function (
			__parent, /* XLogicObject */
			__logicObject, /* XLogicObject */
			__item, /* XMapItemModel */ __layer, /* Number */ __depth, /* Number */ __relative, /* Boolean */
			__x, /* Number */ __y, /* Number */ __z, /* Number */ 
			__scale, /* Number */ __rotation, /* Number */
			args /* Array */
			) { // XLogicObject

			this.xxx.addChild (__logicObject);
			
			__logicObject.setDepth (__depth);
			__logicObject.setRelativeDepthFlag (__relative);
			__logicObject.setLayer (__layer);
									
			g$.trace (": XLogicManager:init: ", __logicObject, args.length, args);
							
			__logicObject.setup (this.xxx, args);

			__logicObject.setItem (__item);
			__logicObject.setPos (new c$.XPoint (__x, __y));			
//			__logicObject.setLayer (__layer);
//			__logicObject.setDepth (__depth);
			__logicObject.setScale (__scale);
			__logicObject.setRotation (__rotation);
			__logicObject.setParent (__parent);
			
			__logicObject.setupX ();
						
//			this.xxx.addChild (__logicObject);
			
			this.m_XLogicObjects.put (__logicObject, 0);
			
			if (__parent == null) {
				this.m_XLogicObjectsTopLevel.put (__logicObject, 0);
			}
			
			return __logicObject;
		},
		
//------------------------------------------------------------------------------------------
		// __object:XLogicObject
		killLater: function (__object /* XLogicObject */) { // void
			g$.trace (": kill? ", __object);
			
			if (this.m_killQueue.indexOf (__object) == -1) {
				this.m_killQueue.push (__object);
			}
		},
		
//------------------------------------------------------------------------------------------
		emptyKillQueue: function () { // void
			var i; /* Number */
					
			for (i=0; i<this.m_killQueue.length; i++) {
				var x /* XLogicObject */ = this.m_killQueue[i]; /* as XLogicObject */
				
				x.cleanup ();
				
				this.removeXLogicObject (x);
			}
			
			this.m_killQueue = new Array ();
		},
		
//------------------------------------------------------------------------------------------
		// x:XLogicObject
		removeXLogicObject: function (x /* XLogicObject */) { // void
			if (this.m_XLogicObjects.exists (x)) {
				this.m_XLogicObjects.remove (x);
			}
						
			if (this.m_XLogicObjectsTopLevel.exists (x)) {
				this.m_XLogicObjectsTopLevel.remove (x);
			}
				
			g$.trace (": kill: ", x, x.m_GUID, x.xxx, this.xxx);
				
			this.xxx.removeChild (x);
		},
		
//------------------------------------------------------------------------------------------
		getXLogicObjects: function () { // XDict
			return this.m_XLogicObjects;
		},
		
//------------------------------------------------------------------------------------------
		updateLogic: function () { // void
			this.m_XLogicObjects.forEach (
				function (x) { // void
					x.updateLogic ();
				}
			);		
		},
		
//------------------------------------------------------------------------------------------
		updatePhysics: function () { // void
			this.m_XLogicObjects.forEach (
				function (x) { // void
					x.updatePhysics ();
				}
			);
		},
		
//------------------------------------------------------------------------------------------
		cullObjects: function () { // void
			this.m_XLogicObjectsTopLevel.forEach (
				function (x) { // void
					x.cullObject ();
				}
			);
		},

//------------------------------------------------------------------------------------------
		setValues: function () { // void
			this.m_XLogicObjects.forEach (
				function (x) { // void
					x.setValues ();
				}
			);
		},
		
//------------------------------------------------------------------------------------------
		updateDisplay: function () { // void
			this.m_XLogicObjectsTopLevel.forEach (
				function (x) { // void
					var logicObject /* XLogicObject */ = x; /* as XLogicObject */
							
					logicObject.x2 = logicObject.y2 = 0;
					logicObject.setMasterAlpha (logicObject.getAlpha ());
					logicObject.setMasterDepth (logicObject.getDepth ());
					logicObject.setMasterVisible (logicObject.getVisible ());
					logicObject.setMasterScaleX (logicObject.getScaleX ());
					logicObject.setMasterScaleY (logicObject.getScaleY ());
					logicObject.setMasterRotation (logicObject.getRotation ());
							
					logicObject.updateDisplay ();
				}.bind (this)
			);
		},
		
//==========================================================================================
$: function () {} }, // end methods

//==========================================================================================
accessors: {
//==========================================================================================
	
//==========================================================================================
$: {} }, // end accessors

//==========================================================================================
statics: {
//==========================================================================================

//==========================================================================================
$: function () {} }, // end statics

//==========================================================================================
end: []
//==========================================================================================
	});
			
//==========================================================================================
}());