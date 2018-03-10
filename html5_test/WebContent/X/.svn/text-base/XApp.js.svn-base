//==========================================================================================
(function() { var c$ = {__initializing__: false};
//==========================================================================================
var n$ = g$.namespace ("X");
	
g$.import (
		function () {
			g$.import (c$, "X.*");
			g$.import (c$, "X.Debug.XDebug");
			g$.import (c$, "X.MVC.*");
			g$.import (c$, "X.Resource.Manager.*");
			g$.import (c$, "X.Signals.*");
			g$.import (c$, "X.Sound.*");
			g$.import (c$, "X.Task.*");
			g$.import (c$, "X.World.*");
			g$.import (c$, "X.XMap.*");
		}
	);

//==========================================================================================
	g$.class (c$, n$, {

//==========================================================================================
	name: "XApp", extend: Object, borrows: [],
//==========================================================================================
		
//==========================================================================================
	properties: {
//==========================================================================================
		m_parent: null,							// Sprite;
		m_XTaskManager: null,					// XTaskManager;
		m_inuse_TIMER_FRAME: 0,					// Number;
		m_XDebug: null,							// XDebug;
		m_projectManager: null,					// XProjectManager;
		m_XSignalManager: null,					// XSignalManager;
		m_XSoundManager: null,					// XSoundManager;
	
//==========================================================================================
$: function () {} }, // end properties

//==========================================================================================
	construct:
//==========================================================================================
		function () {
			if (c$.__initializing__) return;
		
//			Object.call (this;
		
			this.m_XTaskManager = new c$.XTaskManager (this);
			this.m_XSignalManager = new c$.XSignalManager ();
			this.m_XSoundManager = new c$.XSoundManager (this);
			
			this.m_XDebug = new c$.XDebug ();
			this.m_XDebug.setup (this);
			
			setInterval (this.updateTimer.bind (this), 16);
			
			g$.XApp = this;
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
		updateTimer: function () { // void
			if (this.m_inuse_TIMER_FRAME) {
				g$.trace (": overflow: TIMER_FRAME: ");
				
				return;
			}

			this.m_inuse_TIMER_FRAME++;
			
			this.getXTaskManager ().updateTasks ();
			
			this.m_inuse_TIMER_FRAME--;
		},
		
//------------------------------------------------------------------------------------------
		getTime: function () { // Number
			var __date /* Date */ = new Date ();
			
			return __date.getTime ();
		},
		
//------------------------------------------------------------------------------------------
		getXTaskManager: function () { // XTaskManager
			return this.m_XTaskManager;
		},

//------------------------------------------------------------------------------------------
		createXSignal: function () { // XSignal
			return this.m_XSignalManager.createXSignal ();
		},
		
//------------------------------------------------------------------------------------------
		getXSignalManager: function () { // XSignalManager
			return this.m_XSignalManager;
		},

//------------------------------------------------------------------------------------------
		getXSoundManager: function () { // XSoundManager
			return this.m_XSoundManager;
		},
				
//------------------------------------------------------------------------------------------
		// __projectManager:XProjectManager
		setProjectManager: function (__projectManager /* XProjectManager */) { // void
			this.m_projectManager = __projectManager;
		},

//------------------------------------------------------------------------------------------
		getProjectManager: function () { // XProjectManager
			return this.m_projectManager;
		},

//------------------------------------------------------------------------------------------
		//__name:String
		getResourceManagerByName: function (__name /* String */) { // XSubResourceManager
			return this.getProjectManager ().getResourceManagerByName (__name);
		},

//------------------------------------------------------------------------------------------
		// __className:String
		getClass: function (__className /* String */) { // Class
			return this.getProjectManager ().getClassByName (__className);
		},
		
//------------------------------------------------------------------------------------------
		// __className:String
		getClassByName: function (__className /* String */) { // Class
			return this.getProjectManager ().getClassByName (__className);
		},

//------------------------------------------------------------------------------------------
		disableDebug: function () { // void
			this.m_XDebug.disable (true);
		},
		
//------------------------------------------------------------------------------------------
		// ...args
		print: function (/* ...args */) { // void
			this.m_XDebug.print (arguments);
		},
	
//------------------------------------------------------------------------------------------
		getCommonClasses: function () { // Boolean 
			g$.trace (": -------------------------: ");
			g$.trace (": getting common classes: ");
			
			this.getClass ("XLogicObjectXMap:XLogicObjectXMap");
			this.getClass ("ErrorImages:undefinedClass");
				
			return (
				this.getClass ("XLogicObjectXMap:XLogicObjectXMap") == null ||
				this.getClass ("ErrorImages:undefinedClass") == null
				)
		},

//------------------------------------------------------------------------------------------
// report memory leaks
//------------------------------------------------------------------------------------------
		// m_XApp:XApp, xxx:XWorld
		reportMemoryLeaks: function (m_XApp, /* XApp */ xxx /* XWorld */) { // void
			var i; /* Number */
			var x; // *

			this.m_XApp.print ("------------------------------");
			this.m_XApp.print ("active XSignals xxx");
			
			i = 0;
			
			this.getXSignalManager ().getXSignals ().forEach (
				function (x) { // void
					this.m_XApp.print (": signal: " + i + ": " + x + ", parent: " + x.getParent ());
				}.bind (this)
			);
			
			this.m_XApp.print ("------------------------------");
			this.m_XApp.print ("active XSignals XApp");
			
			i = 0;
			
			this.m_XApp.getXSignalManager ().getXSignals ().forEach (
				function (x) { // void
					this.m_XApp.print (": signal: " + i + ": " + x + ", parent: " + x.getParent ());
				}.bind (this)
			);
									
			this.m_XApp.print ("------------------------------");
			this.m_XApp.print ("active XLogicObjects");

			i = 0;
				
			this.xxx.getXLogicManager ().getXLogicObjects ().forEach (
				function (x) { // void
					this.m_XApp.print (": XLogicObject: " + i + ": " + x);
						
					i++;
				}
			);
							
			this.m_XApp.print ("------------------------------");
			this.m_XApp.print ("active tasks xxx: ");
				
			i = 0;
				
			this.xxx.getXTaskManager ().getTasks ().forEach (
				function (x) { // void
					this.m_XApp.print (": task: " + i + ": " + x + ", parent: " + x.getParent ());
					
					i++;
				}.bind (this)
			);

			this.m_XApp.print ("------------------------------");
			this.m_XApp.print ("active tasks XApp: ");
												
			this.m_XApp.getXTaskManager ().getTasks ().forEach (
				function (x) { // void
					this.m_XApp.print (": task: " + i + ": " + x + ", parent: " + x.getParent ());
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