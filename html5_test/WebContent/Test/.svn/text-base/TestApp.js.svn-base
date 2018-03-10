//==========================================================================================
(function() { var c$ = {__initializing__: false};
//==========================================================================================
var n$ = g$.namespace ("$Main");

g$.import (
		function () {
			g$.import (c$, "$Main.*");
			g$.import (c$, "X.*");
			g$.import (c$, "X.HTML5.*");
			g$.import (c$, "X.Resource.Manager.*");
			g$.import (c$, "X.World.*");
			g$.import (c$, "X.World.Logic.*");
			g$.import (c$, "X.World.Sprite.*");
			g$.import (c$, "X.Collections.*");
			g$.import (c$, "X.Geom.*");
			g$.import (c$, "X.Signals.*");
			g$.import (c$, "X.XML.*");
			g$.import (c$, "X.Task.*");
		}
	);

//==========================================================================================
	g$.class (c$, n$, {

//==========================================================================================
	name: "TestApp", extend: c$.Stage5, borrows: [],
//==========================================================================================

//==========================================================================================
	properties: {
//==========================================================================================
		m_XApp: null,							// XApp
		xxx: null,								// World
		m_projectManager: null,					// XProjectManager;
		
		m_testObject: null,						// XLogicObject
		
//==========================================================================================
$: function () {} }, // end properties

//==========================================================================================
	construct:
//==========================================================================================
		function () {
			if (c$.__initializing__) return;

			c$.Stage5.call (this);
		},

//==========================================================================================
	methods: {
//==========================================================================================

//------------------------------------------------------------------------------------------
		setup: function () { // void
			c$.Stage5.prototype.setup.call (this);
			
			this.setColor ("#808080");
			
			this.m_XApp = new c$.XApp ();
			this.m_XApp.setup ();
			
			this.xxx = new c$.XWorld (this, this.m_XApp);
			this.addChild (this.xxx);

			this.setupProjectManager ();
			
			this.xxx.setViewRect (640, 480);
				
			g$.trace (": TestApp: XApp X: ", this.m_XApp);
			g$.trace (": ", g$.stage, g$.canvas, g$.context);
			
			g$.trace (": report sprites: ");
			
			this.reportSprites ();
	
			this.m_XApp.getXTaskManager ().addTask ([
			    c$.XTask.LABEL, "wait",
			    	c$.XTask.WAIT, 0x0100,
			                 	
			    	c$.XTask.FLAGS, function (__task) {
			    		__task.ifTrue (this.m_projectManager.resourceManagerReady ());
			    	}.bind (this),
			    	
			    	c$.XTask.BNE, "wait",
			    	
			    	c$.XTask.FLAGS, function (__task) {
			    		__task.ifTrue (this.xxx.getClass ("Test:FighterClass"));
			    	}.bind (this),
			    	
			    	c$.XTask.BNE, "wait",

			    	function () {	
			    		this.initObjects ();
			    	}.bind (this),
			   	    
			    c$.XTask.RETN,
            ]);
			
			this.setupX ();
		},
		
//------------------------------------------------------------------------------------------
		cleanup: function () { // void
		},

//------------------------------------------------------------------------------------------
		setupProjectManager: function () { // void
			this.m_projectManager = new c$.XProjectManager (this.m_XApp);
			
//			__parent:Sprite,
//			__rootPath:String,
//			__projectName:String,
//			__callback:Function,
//			__loaderContextFactory:Function
			  
			this.m_projectManager.setupFromURL (
				new c$.Sprite5 (),	/* Sprite */
				"Test",				/* String */
				"project.cow",		/* String */
				__callback,			/* Function */
				null				/* Function */
				);
				
			this.m_XApp.setProjectManager (this.m_projectManager);
			
			function __callback () { // void
			}
		},
		
//------------------------------------------------------------------------------------------
		initObjects: function () { // void
			g$.trace (": initializing objects: ", this);
			
			this.m_testObject = this.xxx.getXLogicManager ().initXLogicObject (
					// parent
						null,
					// logicObject
						new c$.TestObjectX (), // as XLogicObject
					// item, layer, depth
						null, 0, 2000,
					// x, y, z
						64, 64, 0,
					// scale, rotation
						1.0, 0
			); // as XLogicObject

			this.m_testObject.m_name = "one";
			
			var __testObject2 = this.xxx.getXLogicManager ().initXLogicObject (
					// parent
						null,
					// logicObject
						new c$.TestObjectX (), // as XLogicObject                                                                                                                                          cObject
					// item, layer, depth
						null, 0, 1500,
					// x, y, z
						80, 80, 0,
					// scale, rotation
						1.0, 0
			); // as XLogicObject

			__testObject2.m_name = "two";
			
			var sprite = new c$.XSprite ();
//			sprite.x2 = 5;
//			sprite.y2 = 5;
			
			this.addChild (sprite);
			
			g$.trace (":-----------------------------------: ");
			this.reportSprites ();
		},
		
//------------------------------------------------------------------------------------------
		basicTests: function () { // void
			var dict = new c$.XDict ();
			dict.put (this, 0);
			
			var point = new c$.XPoint2 (128, 128);
			point.x = 256;
			point.y = 512;
			point.setup ();
			var point2 = point.cloneX ();
			g$.trace (": ", point.x, point.y);
			
			var simpleXMLNode = new c$.XSimpleXMLDocument ();
			
			g$.trace (": props: ", simpleXMLNode);
			g$.trace (": >: ");

			simpleXMLNode.setupWithXMLString (
					'<?xml version="1.0" encoding="UTF-8"?>' +
					'<people>' +
					  '<person>' +
					    '<name type="varchar">bob</name>' +
					    '<id type="int8">1</id>' +
					  '</person>' +
					'</people>'
			);
			
			g$.trace (": simpleXMLNode: ", simpleXMLNode.toXMLString ());
			
			var taskManager = new c$.XTaskManager ();
			
			g$.trace (": taskManager:", taskManager);
			
			var number = new c$.XNumber ();
			number.value = 0x0100;
			
			g$.trace (": number: ", number.value);
			
			taskManager.addTask ([	
				function () {
					g$.trace (": task running");
				},
				
				c$.XTask.WAIT, number,
				
				c$.XTask.RETN,
			]);
			
			taskManager.updateTasks ();
			
			var httpRequest = new g$.httpRequest ();
			
			httpRequest.connect (
				"GET", "X/test.txt", "",
				
				function (request) {
					g$.trace (": ", request.responseText);
				}
			);
			
			httpRequest.test ();
			
			g$.trace (": httpRequest: ", httpRequest);
			
			g$.trace (g$.format ("{0} there", "hello"));
			
			g$.trace (": g$: ", g$);
			
			var test = {};
			
			g$.trace (": ------->: ", "extend" in test, test.extend);
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