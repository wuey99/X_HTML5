//==========================================================================================
(function() { var c$ = {__initializing__: false};
//==========================================================================================
var n$ = g$.namespace ("X.Resource.Manager");
	
g$.import (
		function () {
			g$.import (c$, "X.Task.*");
			g$.import (c$, "X.XML.*");
//			g$.import (c$, "X.XApp");
			g$.import (c$, "X.Resource.*");
		}
	);

//------------------------------------------------------------------------------------------
// XProjectManager
//
// manages the main project which can contain one more more sub-projects
//------------------------------------------------------------------------------------------

//==========================================================================================
	g$.class (c$, n$, {

//==========================================================================================
	name: "XProjectManager", extend: Object, borrows: [],
//==========================================================================================

//==========================================================================================
	properties: {
//==========================================================================================
		m_XApp: null,								// XApp;
		m_parent: null, 							// Sprite;
		m_rootPath: "",								// String;
		m_projectName: "", 							// String;
		m_loadComplete: false,						// Boolean;
		m_projectXML: null,							// XSimpleXMLNode;
		m_loaderContextFactory: null,				// Function;
		m_subResourceManagers: null,				// Array;
		m_callback: null, 							// Function;
		m_embeddedResources: null,					// Object;
	
//==========================================================================================
$: function () {} }, // end properties

//==========================================================================================
	construct:
//==========================================================================================
		// __XApp
		function (__XApp) {
			if (c$.__initializing__) return;
		
//			Object.call (this);
			
			this.m_XApp = __XApp;
			this.m_loadComplete = true;
			this.m_projectXML = null;
			this.m_embeddedResources = new Object ();
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
		kill: function () { // void
			this.reset ();
		},
		
//------------------------------------------------------------------------------------------
		reset: function () { // void
			var i;
			
			for (i=0; i<this.m_subResourceManagers.length; i++) {
				this.m_subResourceManagers[i].kill ();
			}
			
			while (this.m_subResourceManagers.length) {
				this.m_subResourceManagers.pop ();
			}
		},
	
//------------------------------------------------------------------------------------------
		// __parent:Sprite,
		// __rootPath:String,
		// __urlName:String,
		// __callback:Function,
		// __loaderContextFactory:Function
		
		setupFromURL: function (
			__parent,				
			__rootPath,				
			__projectName,				
			__callback,				
			__loaderContextFactory
			) { // void
				
			this.m_parent = __parent;
			this.m_subResourceManagers = new Array ();
			this.setBothPaths (__rootPath, __projectName);
			this.m_loaderContextFactory = __loaderContextFactory;
			this.loadProjectFromURL (__rootPath, __projectName, __callback);
		},
		

//------------------------------------------------------------------------------------------
		// __loaderContextFactory:Function
		setLoaderContextFactory: function (__loaderContextFactory) { // void
			m_loaderContextFactory = __loaderContextFactory;
		},
		
//------------------------------------------------------------------------------------------	
		loaderContextFactory: function () { // Function
			return this.m_loaderContextFactory;
		},
		
//------------------------------------------------------------------------------------------
		// __rootPath:String,
		// __projectName:String,
		// __callback:Function

		loadProjectFromURL: function (
			__rootPath,					
			__projectName,					
			__callback
			) { // Boolean
				
			if (!this.m_loadComplete) {
				return false;
			}
			
			this.reset ();

			if (__projectName != null) {
				this.m_loadComplete = false;
			
				this.m_rootPath = __rootPath;
			
				var __httpRequest = new g$.httpRequest ();
				
				__httpRequest.connect (
					"GET", this.m_rootPath + g$.pathSeperator + __projectName, "", this.__completeHandler.bind (this)
				);
			}
			
			this.m_callback = __callback;
				
			return true;
		},
		
//------------------------------------------------------------------------------------------					
		__completeHandler: function (request) { // void
			try {		
  	   		  	var xml /* XML */ = new c$.XSimpleXMLNode ();
  	   		  	xml.setupWithXMLString (request.responseText)
  	   		  	
				this.m_projectXML = xml;
  	   		  	
  	   		  	g$.trace (": completeHandler: importManifests:");
  	   		  	
				this.__importManifests ();
  	   		}
  	   		catch (e) {	
  	   			throw (new Error ("Not a valid XML file"));
  	   		}
  	   		
			this.m_loadComplete = true;
		},
			
//------------------------------------------------------------------------------------------	
		// __rootPath:String, __urlName:String
		setBothPaths: function (__rootPath, __projectName) { // void
			this.m_rootPath = __rootPath;
			this.m_urlName = __projectName;
		},
		
//------------------------------------------------------------------------------------------
		// __rootPath:String
		setRootPath: function (__rootPath) { // void
			this.m_rootPath = __rootPath;
		},

//------------------------------------------------------------------------------------------
		getRootPath: function () { // String
			return this.m_rootPath;
		},

//------------------------------------------------------------------------------------------
		// __parent:Sprite,
		// __rootPath:String,
		// __xml:XSimpleXMLNode,
		// __callback:Function,
		// __loaderContextFactory
		
		setupFromXML: function (
			__parent,
			__rootPath,
			__xml,
			__callback,
			__loaderContextFactory
			) { // void
				
			this.m_parent = __parent;
			this.m_subResourceManagers = new Array ();
			this.m_loaderContextFactory = __loaderContextFactory;
			this.loadProjectFromXML (__rootPath, __xml, __callback);
		},
		
//------------------------------------------------------------------------------------------
		// __rootPath:String,
		// __xml:XML,
		// __callback:Function
			
		loadProjectFromXML: function (
			__rootPath,
			__xml,
			__callback) { // Boolean
				
			this.reset ();
			
			this.m_loadComplete = false;
			
			this.m_rootPath = __rootPath;	
			this.m_callback = __callback;
			this.m_projectXML = __xml;
			
			this.__importManifests ();
			
			this.m_loadComplete = true;
			
			return true;
		},
	
//------------------------------------------------------------------------------------------
		__importManifests: function () { // void
			var __xmlList /* XMLList */ = this.m_projectXML.child ("manifest");
			
			var i;
				
			g$.trace (": XProjectManager: __importManifests: ", __xmlList);
			
			for (i=0; i<__xmlList.length; i++) {
				var __subResourceManager = new c$.XSubResourceManager ();

				var __manifestList = __xmlList[i].child ("*");
				var __manifest = null;
				if (__manifestList.length) {
					__manifest = __manifestList[0];	
				}
	
				if (__manifest == null) {
					__subResourceManager.setupFromURL (
						this,
						this.m_parent,
						this.getRootPath (),
						__xmlList[i].getAttribute ("name"),
						null,
						this.loaderContextFactory ()
						);
				}
				else
				{
					__subResourceManager.setupFromXML (
						this,
						this.m_parent,
						this.getRootPath (),
						__manifest,
						null,
						this.loaderContextFactory ()
						);				
				}
					
				this.addSubResourceManager (__subResourceManager);
			}
	
			this.m_XApp.getXTaskManager ().addTask ([		
					c$.XTask.LABEL, "__wait",		
						c$.XTask.FLAGS, function (__XTask) {
							__XTask.setFlagsBool (this.resourceManagerReady ());
						}.bind (this),
						
						c$.XTask.WAIT, 0x0100,
						
						c$.XTask.BNE, "__wait",
					
					function () {
						if (this.m_callback != null) {
							this.m_callback ();
						}
					}.bind (this),
					
				c$.XTask.RETN,
			]);
		},
		
		
//------------------------------------------------------------------------------------------
		// __subResourceManager:XSubResourceManager
		
		addSubResourceManager: function (__subResourceManager) { // void
			this.m_subResourceManagers.push (__subResourceManager);
		},

//------------------------------------------------------------------------------------------
		// __resourcePath:String, __swfBytes:Class
		
		addEmbeddedResource: function (__resourcePath, __swfBytes) { // void
			this.m_embeddedResources[__resourcePath] = __swfBytes;
		},
		
//------------------------------------------------------------------------------------------
		// __resourcePath:String
		
		findEmbeddedResource: function (__resourcePath) { // Class
			return this.m_embeddedResources[__resourcePath];
		},
		
//------------------------------------------------------------------------------------------
		getProject: function () { // XSimpleXMLNode
			return this.m_projectXML;
		},
	
//------------------------------------------------------------------------------------------
		resourceManagerReady: function () { // Boolean
			if (!this.m_loadComplete) {
				return false;
			}
			
			var i;						// Number;
			var r;						// XSubResourceManager;
			var c;						// Class;
			
			for (i=0; i<this.m_subResourceManagers.length; i++) {
				r = this.m_subResourceManagers[i];
				
				if (!r.resourceManagerReady ()) {
					return false;
				}
			}
			
			return true;
		},
		
//------------------------------------------------------------------------------------------
		// __xml:XSimpleXMLNode
		deleteManifest: function (__xml) { // void
// TBD
//			delete __xml.parent ().(@name == __xml.@name)[0];
		},	
	
//------------------------------------------------------------------------------------------
		// __xmlItem:XSimpleXMLNode, __xmlToInsert:XSimpleXMLNode
		
		insertManifest: function (__xmlItem, __xmlToInsert) { // void {
			if (__xmlItem == null) {
				return;
			}
				
			if (__xmlItem.localName () == "resource") {
				__xmlItem.insertChildAfter (__xmlItem, __xmlToInsert);
			}
		},
		
//------------------------------------------------------------------------------------------
		resourceManagers: function () { // Array
			return this.m_subResourceManagers;
		},

//------------------------------------------------------------------------------------------
		// __name:String
		
		getResourceManagerByName: function (__name) { // XSubResourceManager
			for (var i = 0; i < this.m_subResourceManagers[i].length; i++) {
				if (this.m_subResourceManagers[i].getName () == __name) {
					return this.m_subResourceManagers[i]; // as XSubResourceManager;
				}
			}

			return null;
		},
	
//------------------------------------------------------------------------------------------
// looks up Class based on the full class name
//------------------------------------------------------------------------------------------
		// __className:String
		getClassByName: function (__className) { // Class
			if (!this.resourceManagerReady ()) {
					return null;
			}
					
			var i;	// Number;
			var r;	// XSubResourceManager;
			var c;	// Class;
				
			g$.trace (": XProjectManger: ", this.m_subResourceManagers);
			
			for (i=0; i<this.m_subResourceManagers.length; i++) {
				r = this.m_subResourceManagers[i];
						
				g$.trace (": XProjectManager: XSubResourceManager: ", r);
				
				try {
					c = r.getClassByName (__className);
				}
				catch (e) {
					var error = "className not found in manifest";
							
					if (e.message.substring (0, error.length) == error) {
						continue;
					}
					else
					{
						throw (e);
					}
				}
						
				return c;
			}
					
			throw (Error ("className not found in any manifest: " + __className));
		},
		
//------------------------------------------------------------------------------------------
		cacheClassNames: function () { // Boolean
			if (!this.resourceManagerReady ()) {
				return false;
			}
			
			var i;		// Number;
			var r;		// XSubResourceManager;
			
			for (i=0; i<this.m_subResourceManagers.length; i++) {
				r = this.m_subResourceManagers[i];
				
				g$.trace (": resourceManager: ", r);
				
				r.cacheClassNames (r.getManifest ().child ("folder")[0].child ("*"));
			}
			
			return true;
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