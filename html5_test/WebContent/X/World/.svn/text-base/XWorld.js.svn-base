//==========================================================================================
(function() { var c$ = {__initializing__: false};
//==========================================================================================
var n$ = g$.namespace ("X.World");

g$.import (
		function () {
			g$.import (c$, "X.World.*");
			g$.import (c$, "X.*");
//			g$.import (c$, "X.Datasource.XDatasource");
//			g$.import (c$, "X.Debug.*");
//			g$.import (c$, "X.Document.*");
			g$.import (c$, "X.Geom.*");
			g$.import (c$, "X.Keyboard.*");
			g$.import (c$, "X.MVC.*");
			g$.import (c$, "X.Resource.*");
			g$.import (c$, "X.Resource.Manager.*");
			g$.import (c$, "X.Signals.*");
			g$.import (c$, "X.Sound.*");
			g$.import (c$, "X.Task.*");
//			g$.import (c$, "X.World.Collision.*");
			g$.import (c$, "X.World.Logic.*");
			g$.import (c$, "X.World.Sprite.*");
//			g$.import (c$, "X.World.Tiles.*");
//			g$.import (c$, "X.World.UI.XButton");
			g$.import (c$, "X.XML.*");
			g$.import (c$, "X.XMap.*");
			g$.import (c$, "X.HTML5.*");
		}
	);

//==========================================================================================
	g$.class (c$, n$, {

//==========================================================================================
	name: "XWorld", extend: c$.XSprite, borrows: [],
//==========================================================================================

//==========================================================================================
	properties: {
//==========================================================================================
		m_ticks: 0,							// Number;
		m_world: null, 						// b2World;
		m_iterations: 20,					// int = 20;
		m_timeStep: 1.0/30.0,				// Number = 1.0/30.0;
		m_parent: null,						// Sprite;	
		m_XApp: null,						// XApp
		m_XLogicManager: null,				// XLogicManager;
		m_XTaskManager: null,				// XTaskManager;
		m_renderManager: null,				// XTaskManager;
		m_XMapModel: null,					// XMapModel;
		m_XWorldLayers: [],					// Array;
		m_XHudLayer: null,					// XSpriteLayer;

		m_inuse_ENTER_FRAME: 0,				// Number;
		m_inuse_RENDER_FRAME: 0,			// Number;
		m_XKeyboardManager: null,			// XKeyboardManager;
		m_viewRect: null,					// XRect;
	
//==========================================================================================
$: function () {} }, // end properties

//==========================================================================================
	construct:
//==========================================================================================
		function (__parent, /* Sprite */ __XApp /* XApp */) {
			if (c$.__initializing__) return;
			
			c$.XSprite.call (this);
			
			this.m_parent = __parent;
			this.m_XApp = __XApp;
			
			this.mouseEnabled = true;
			this.mouseChildren = true;
			
			// Add event for main loop
			setInterval (this.onEnterFrame.bind (this), 16);
			this.m_inuse_ENTER_FRAME = 0;

			// Create world AABB
//			var worldAABB:b2AABB = new b2AABB ();
//			worldAABB.lowerBound.Set (-100.0, -100.0);
//			worldAABB.upperBound.Set (100.0, 100.0);
			
			// Define the gravity vector
//			var gravity:b2Vec2 = new b2Vec2 (0.0, 30.0);
			
			// Allow bodies to sleep
//			var doSleep:Boolean = true;
			
			// Construct a world object
//			m_world = new b2World (worldAABB, gravity, doSleep);
			
			this.m_ticks = 0;
			
			g$.trace (": XWorld: XLogicManager: ", this);
			
			this.m_XLogicManager = new c$.XLogicManager (this);
			this.m_XTaskManager = new c$.XTaskManager (__XApp);
			this.m_renderManager = new c$.XTaskManager (__XApp);
			this.m_XSignalManager = new c$.XSignalManager ();
									
			this.m_XMapModel = null;
						
			this.m_XWorldLayers = new Array ();
						
	//		for (var i:Number = MAX_LAYERS-1; i>=0; i--) {
			for (var i /* Number */ = 0; i<c$.XWorld.MAX_LAYERS; i++) {
				this.m_XWorldLayers[i] = new c$.XSpriteLayer ();
				this.m_XWorldLayers[i].setup (this);
				this.addChild (this.m_XWorldLayers[i]);
				this.m_XWorldLayers[i].mouseEnabled = true;
				this.m_XWorldLayers[i].mouseChildren = true;
			}
	
			this.m_XHudLayer = new c$.XSpriteLayer ();
			this.m_XHudLayer.setup (this);
			this.addChild (this.m_XHudLayer);
			this.m_XHudLayer.mouseEnabled = true;
			this.m_XHudLayer.mouseChildren = true;
	
			this.m_XKeyboardManager = new c$.XKeyboardManager (this);
					
//			this.setupDebug ();
			
			g$.trace (": XWorld: ", this);
			g$.trace (": XWorld. XTaskManager: ", this.getXTaskManager ());
			g$.trace (": XWorld: m_XWorldLayers: ", this.m_XWorldLayers);
			g$.trace (": XSprite: m_scale: ", this.m_scale);
			g$.trace (": XSprite0: m_xxx: ", this.m_xxx);
			g$.trace (": Sprite5: alpha: ", this.alpha);
			g$.trace (": DisplayObject5: m_children: ", this.m_children);
			
			return;
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
		setupDebug: function () { // void
		},
		
//------------------------------------------------------------------------------------------
		onEnterFrame: function (/* e:Event */) { // void
			if (this.m_inuse_ENTER_FRAME) {
				g$.trace (": overflow: ENTER_FRAME: ");
				
				return;
			}
			
			this.m_inuse_ENTER_FRAME++;
			
			this.getXLogicManager ().emptyKillQueue ();
			
				this.getXLogicManager ().updateLogic ();
				this.getXTaskManager ().updateTasks ();
//				this.getXLogicManager ().updatePhysics ();
				this.getXLogicManager ().cullObjects ();
//				m_world.Step (m_timeStep, m_iterations);
				this.getXLogicManager ().setValues ();
				
			this.getXLogicManager ().emptyKillQueue ();

			this.getXLogicManager ().updateDisplay ();
 
			for (var i /* Number*/ = 0; i<c$.XWorld.MAX_LAYERS; i++) {
				if (this.getXWorldLayer (i).forceSort) {
					this.getXWorldLayer (i).depthSort ();
					this.getXWorldLayer (i).forceSort = false;
				}
			}
			
			this.getXHudLayer ().depthSort ();
			
			this.m_inuse_ENTER_FRAME--;
		},
		
//------------------------------------------------------------------------------------------
		onRenderFrame: function (/* e:Event */) { // void
			if (this.m_inuse_RENDER_FRAME) {
				g$.trace (": overflow: RENDER_FRAME: ");
				
				return;
			}
			
			this.m_inuse_RENDER_FRAME++;
			
			this.getRenderManager ().updateTasks ();
			
			this.m_inuse_RENDER_FRAME--;		
		},
		
//------------------------------------------------------------------------------------------
		getXApp: function () { // XApp
			return this.m_XApp;
		},
		
//------------------------------------------------------------------------------------------
		show: function () { // void
			this.visible = true;
		},

//------------------------------------------------------------------------------------------
		hide: function () { // void
			this.visible = false;
		},
		
//------------------------------------------------------------------------------------------
		getWorld: function () { // b2World
			return this.m_world;
		},
		
//------------------------------------------------------------------------------------------
		// __XMapModel:XMapModel
		setXMapModel: function (__XMapModel /* XMapModel */) { // void
			this.m_XMapModel = __XMapModel;
		},
			
//------------------------------------------------------------------------------------------
		getXMapModel: function () { // XMapModel
			return this.m_XMapModel;
		},
		
//------------------------------------------------------------------------------------------
		getXLogicManager: function () { // XLogicManager
			return this.m_XLogicManager;
		},

//------------------------------------------------------------------------------------------
		createXSignal: function () { // XSignal
			return  this.m_XSignalManager.createXSignal ();
		},
		
//------------------------------------------------------------------------------------------
		getXSignalManager: function () { // XSignalManager
			return this.m_XSignalManager;
		},
		
//------------------------------------------------------------------------------------------
		getXTaskManager: function () { // XTaskManager
			return this.m_XTaskManager;
		},
		
//------------------------------------------------------------------------------------------
		grabFocus: function () { // void
			this.m_XKeyboardManager.grabFocus ();
		},
		
//------------------------------------------------------------------------------------------
		releaseFocus: function () { // void
			this.m_XKeyboardManager.releaseFocus ();
		},
		
//------------------------------------------------------------------------------------------
		// __c:uint
		getKeyCode: function (__c /* uint */) { // Boolean
			return this.m_XKeyboardManager.getKeyCode (__c);
		},
		
//------------------------------------------------------------------------------------------
		getRenderManager: function () { // XTaskManager
			return this.m_renderManager;
		},
		
//------------------------------------------------------------------------------------------
		// __layer:Number
		getXWorldLayer: function (__layer /* Number */) { // XSpriteLayer
			return this.m_XWorldLayers[__layer];
		},

//------------------------------------------------------------------------------------------
		getXHudLayer: function () { // XSpriteLayer
			return this.m_XHudLayer;
		},
		
//------------------------------------------------------------------------------------------
		// __className:String
		getClass: function (__className /* String */) { // Class
			return this.m_XApp.getClass (__className);
		},

//------------------------------------------------------------------------------------------
		// _layer:Number, __p:XPoint
		globalToWorld: function (__layer, /* Number */ __p /* XPoint */) { // XPoint
			var __x; /* Point */
			
			if (__layer < 0) {
				__x = this.getXHudLayer ().globalToLocal (__p);
			}
			else 
			{
				__x = this.getXWorldLayer (__layer).globalToLocal (__p);
			}
			
			return new c$.XPoint (__x.x, __x.y);
		},
		
//------------------------------------------------------------------------------------------
		// __width:Number, __height:Number
		setViewRect: function (
			__width, /* Number */ __height /* Number */
			) { // void {
				
			this.m_viewRect = new c$.XRect (0, 0, __width, __height);
		},

//------------------------------------------------------------------------------------------	
		getViewRect: function () { // XRect {
			return this.m_viewRect;
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
		MAX_LAYERS: 4,					// Number = 4;
	
//==========================================================================================
$: function () {} }, // end statics

//==========================================================================================
end: []
//==========================================================================================
	});
			
//==========================================================================================
}());