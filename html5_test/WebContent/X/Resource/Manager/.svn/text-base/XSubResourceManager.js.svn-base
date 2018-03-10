//==========================================================================================
(function() { var c$ = {__initializing__: false};
//==========================================================================================
var n$ = g$.namespace ("X.Resource.Manager");
	
g$.import (
		function () {
			g$.import (c$, "X.XML.*");
			g$.import (c$, "X.Resource.*");
			g$.import (c$, "X.Resource.Types.*");
		}
	);

//==========================================================================================
	g$.class (c$, n$, {

//==========================================================================================
	name: "XSubResourceManager", extend: Object, borrows: [],
//==========================================================================================

//==========================================================================================
	properties: {
//==========================================================================================
		m_manifestXML: null,							// XSimpleXMLNode;
		m_projectManager: null,							// XProjectManager;
		m_resourceMap: null,							// Object;
		m_classMap: null,								// Object;
		m_parent:null,									// Sprite;
		m_rootPath: "",									// String;
		m_manifestName: "",								// String;
		m_loadComplete: false,							// Boolean;
		m_loaderContextFactory: null,					// Function;
		m_cachedClassName: null,						// Object;
	
//==========================================================================================
$: function () {} }, // end properties

//==========================================================================================
	construct:
//==========================================================================================
		function () {
			if (c$.__initializing__) return;
		
//			Object.call (this);
			
			this.m_resourceMap = new Object ();
			this.m_classMap = new Object ();
			this.m_cachedClassName = new Object ();
			
			this.m_loaderContextFactory = null;
			
			this.m_loadComplete = true;
			this.m_manifestXML =  null;
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
			
// unload .swf's here?
			this.m_resourceMap = new Object ();
			this.m_classMap = new Object ();
		},
		
//------------------------------------------------------------------------------------------
		// __projectManager:XProjectManager,
		// __parent:Sprite,
		// __rootPath:String,
		// __manifestName:String,
		// __callback:Function,
		// __loaderContextFactory:Function
		
		setupFromURL: function (
			__projectManager,
			__parent,
			__rootPath,
			__manifestName,
			__callback,
			__loaderContextFactory
			) { // void
				
			this.m_projectManager = __projectManager;
			this.m_parent = __parent;
			this.setBothPaths (__rootPath, __manifestName);
			this.m_loaderContextFactory = __loaderContextFactory;

			this.loadManifestFromURL (__rootPath, __manifestName, __callback);
		},
		
//------------------------------------------------------------------------------------------
		// __loaderContextFactory:Function
		
		setLoaderContextFactory: function (__loaderContextFactory) { // void
			this.m_loaderContextFactory = __loaderContextFactory;
		},
		
//------------------------------------------------------------------------------------------	
		loaderContextFactory: function () { // Function
			return this.m_loaderContextFactory;
		},
		
//------------------------------------------------------------------------------------------
		// __rootPath:String,
		// __manifestName:String,
		// __callback:Function
			
		loadManifestFromURL: function (
			__rootPath,
			__manifestName,
			__callback) { // Boolean
				
			if (!this.m_loadComplete) {
				return false;
			}
					
			if (__manifestName != null) {
				this.m_loadComplete = false;
			
				this.m_rootPath = __rootPath;
	
				g$.trace (": XSubResourceManager: loadManifestFromURL: ", __rootPath, __manifestName);
				
				var __httpRequest = new g$.httpRequest ();
				
				__httpRequest.connect (
					"GET",
					this.m_rootPath + g$.pathSeperator + __manifestName,
					"",
					function (request) {
						this.__completeHandler (request);
						
						if (__callback != null) {
							__callback ();
						}
					}.bind (this)
				);
			}
	
			return true;
		},
		
//------------------------------------------------------------------------------------------					
		__completeHandler: function (request) { // void
			try {
				g$.trace (": XSubResourceManager: __completeHandler: ", request.responseText);
				
  	   		  	var __xml /* XML */ = new c$.XSimpleXMLNode ();
  	   		  	__xml.setupWithXMLString (request.responseText);
	     	   		  	
				this.setManifest (__xml);
			}
			catch (e) {
				throw (new Error ("Not a valid XML file"));
			}
			
			this.m_loadComplete = true;
		},
	
//------------------------------------------------------------------------------------------
		// __projectManager:XProjectManager,
		// __parent:Sprite,
		// __rootPath:String,
		// __xml:XSimpleXMLNode,
		// __callback:Function,
		// __loaderContextFactory:Function
		
		setupFromXML: function (
			__projectManager,
			__parent,
			__rootPath,
			__xml,
			__callback,
			__loaderContextFactory
			) { // void
				
			this.m_projectManager = __projectManager;
			this.m_parent = __parent;
			this.setBothPaths (__rootPath, "");
			this.m_loaderContextFactory = __loaderContextFactory;

			this.loadManifestFromXML (__rootPath, __xml, __callback);
		},
		
//------------------------------------------------------------------------------------------
		// __rootPath:String,
		// __xml:XML,
		// __callback:Function
			
		loadManifestFromXML: function (
			__rootPath,
			__xml,
			__callback) { // Boolean
		
			this.m_loadComplete = false;
			
			this.m_rootPath = __rootPath;
				
			this.setManifest (__xml);
			
			if (__callback != null) {
				__callback ();
			}
			
			m_loadComplete = true;
						
			return true;		
		},
		
//------------------------------------------------------------------------------------------
		// __resourcePath:String
		
		findEmbeddedResource: function (__resourcePath) { // Class
			return this.m_projectManager.findEmbeddedResource (__resourcePath);
		},
		
//------------------------------------------------------------------------------------------
		// __xml:XSimpleXMLNode
		
		setManifest: function (__xml) { // void
			this.m_manifestXML = __xml;
		},
		
//------------------------------------------------------------------------------------------
		// __rootPath:String, __manifestName:String
		
		setBothPaths: function (__rootPath, __manifestName) { // void
			this.m_rootPath = __rootPath;
			this.m_manifestName = __manifestName;
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
		getManifestName: function () { // String
			return this.m_manifestName;
		},
		
//------------------------------------------------------------------------------------------
		getName: function () { // String
			return this.getManifestName ().substr(0, getManifestName ().lastIndexOf('.'))
		},
		
//------------------------------------------------------------------------------------------
		getManifest: function () { // XSimpleXMLNode
			return this.m_manifestXML;
		},
		
//------------------------------------------------------------------------------------------
		resourceManagerReady: function () { // Boolean
			return this.m_loadComplete;
		},
		
//------------------------------------------------------------------------------------------
		// __xml: XSimpleXMLNode
		
		deleteResourceXML: function (__xml) { // void
// TBD
//			delete __xml.parent ().resource.(@name == __xml.@name)[0];
		},
		
//------------------------------------------------------------------------------------------
		// __xmlItem:XSimpleXMLNode, __xmlToInsert:XSimpleXMLNode
		
		insertResourceXML: function (__xmlItem, __xmlToInsert) { // void
			if (__xmlItem == null) {
				return;
			}
		
			if (__xmlItem.localName () == c$.XSubResourceManager.CLASS_TYPE) {
				__xmlItem.parent ().insertChildAfter (__xmlItem.parent (), __xmlToInsert);
			}
				
			if (__xmlItem.localName () == c$.XSubResourceManager.RESOURCE_TYPE) {
				__xmlItem.parent ().insertChildAfter (__xmlItem, __xmlToInsert);
			}
				
			if (__xmlItem.localName () == c$.XSubResourceManager.FOLDER_TYPE) {
				__xmlItem.appendChild (__xmlToInsert);
			}
		},
		
//------------------------------------------------------------------------------------------
		// __resourceName:String
		
		findResourceXMLFromName: function (__resourceName) { // XSimpleXMLNode	
			return this.findNodeFromResourceName (
					null,
					__resourceName,
					this.m_manifestXML.child ("folder")[0].child ("*")
					);
		},
		
//------------------------------------------------------------------------------------------
		// __resourceName:String
		
		findResourceFromName: function (__resourceName) { // XResource
			var __resourceXML = this.findResourceXMLFromName (__resourceName);
			
			return this.__getXResourceFromPath (
				__resourceXML.getAttribute ("path") + g$.pathSeperator +__resourceXML.getAtrtribute ("dst"),
				__resourceXML
				);
		},
		
//------------------------------------------------------------------------------------------
// looks up Class based on the full class name
//------------------------------------------------------------------------------------------
		// __className:String
		
		getClassByName: function (__className) { // Class
			if (!this.m_loadComplete) {
				return null;
			}
							
			var __XClass = this.__resolveXClass (__className);
					
			var __class = __XClass.getClass ();
					
			if (__class == null) {
				__class = this.__resolveClass (__XClass);
			}
					
				return __class;
		},
		
//------------------------------------------------------------------------------------------
		// __match:XML,
		// __srcName:String,
		// __xmlList:Array
		
		findNodeFromSrcName: function (
			__match,
			__srcName,
			__xmlList
			) { // XSimpleXMLNode
				
			var i, j;
					
			for (i = 0; i<__xmlList.length; i++) {
				if (__xmlList[i].localName () == "folder") {
					var nuMatch = findNodeFromSrcName (
						__match,
						__srcName,
						__xmlList[i].child ("*")
						);
						
					if (nuMatch != null) {
						__match = nuMatch;
					}
				}
				else
				{				
					if (__srcName == __xmlList[i].getAttribute ("src")) {	
						__match = __xmlList[i];
					}
				}
			}
			
			return __match;
		},

//------------------------------------------------------------------------------------------
		// __match:XML,
		// __resourceName:String,
		// __xmlList:Array
		
		findNodeFromResourceName: function (
			__match,
			__resourceName,
			__xmlList
			) { // XSimpleXMLNode
				
			var i, j;
						
			for (i = 0; i<__xmlList.length; i++) {
				if (__xmlList[i].localName () == "folder") {
					var nuMatch = this.findNodeFromResourceName (
						__match,
						__resourceName,
						__xmlList[i].child ("*")
						);
						
					if (nuMatch != null) {
						__match = nuMatch;
					}
				}
				else
				{
					if (__resourceName == __xmlList[i].getAttribute ("name")) {
						__match = __xmlList[i];
					}
				}
			}
			
			return __match;
		},

//------------------------------------------------------------------------------------------
// look for an e4x-centric way of finding a "classX" name
// my intuition tells me that this method can be achieved via e4x
//------------------------------------------------------------------------------------------
		// __match:XSimpleXMLNode,
		// __resourceName:String,
		// __className:String,
		// __xmlList:Array
		
		findNodeFromClassName: function (
			__match,
			__resourceName,
			__className,
			__xmlList
			) { // XSimpleXMLNode
						
			var __fullName /* String */ = __resourceName + ":" + __className;
			
			if (this.m_cachedClassName[__fullName] != undefined) {			
				return this.m_cachedClassName[__fullName];
			}
					
			var i, j;
								
			for (i = 0; i<__xmlList.length; i++) {
				g$.trace (": xmlList[i]: ", __xmlList[i].localName ());
				
				if (__xmlList[i].localName () == "folder") {
					var nuMatch = this.findNodeFromClassName (
						__match,
						__resourceName,
						__className,
						__xmlList[i].child ("*")
					);
								
					if (nuMatch != null) {
						__match = nuMatch;
					}
				}
				else
				{	
					if (__resourceName == __xmlList[i].getAttribute ("name")) {					
						var __classList /* Array */ = __xmlList[i].child ("classX");
			
						for (j=0; j<__classList.length; j++) {
							if (this.m_cachedClassName[__fullName] == undefined) {
								this.m_cachedClassName[__fullName] = __xmlList[i];
							}
							
							if (__classList[j].getAttribute ("name") == __className) {
								__match = __xmlList[i];
							}
						}
					}
				}
			}
					
			return __match;
		},

//------------------------------------------------------------------------------------------
		// __xmlList:Array
		
		cacheClassNames: function (__xmlList) { // void
			var i, j;
						
			for (i = 0; i<__xmlList.length; i++) {
				g$.trace (": caching: ", __xmlList[i].localName ());
				
				if (__xmlList[i].localName () == "folder") {
					cacheClassNames (__xmlList[i].child ("*"));
				}
				else
				{
					for (j=0; j<__xmlList[i].child ("classX").getAttribute ("name").length; j++) {						
						m_cachedClassName[__xmlList[i].child ("classX").getAttribute ("name")[j]] = __xmlList[i];
					}	
				}
			}
		},
		
//------------------------------------------------------------------------------------------
		// __fullName:String
		
		__lookUpResourcePathByClassName: function (__fullName) { // Array
			g$.trace (": XSubResourceManager: __lookUpResourcePathByClassName 1: ", this.m_manifestXML);
			
			if (this.m_manifestXML == null) {
				throw (Error ("manifest hasn't been loaded yet"));
			}
			
			var r = new c$.XResourceName (__fullName);
			
			var __manifestName = r.manifestName;
			var __resourceName = r.resourceName;
			var __className = r.className;
			
			g$.trace (": XSubResourceManager: __lookUpResourcePathByClassName 2: ", __manifestName, __resourceName, __className);
			
			if (__manifestName != "") {
				throw (Error ("classname: " + __fullName + " is not valid"));
			}
			
			g$.trace ("1");
			g$.trace (": ", this.m_manifestXML.child ("folder"));
			
			var match =
				this.findNodeFromClassName (
					null,
					__resourceName,
					__className,
					this.m_manifestXML.child ("folder")[0].child ("*")
					);
			
			g$.trace ("2");
			
			if (match == null) {
				throw (Error ("className not found in manifest: " + __fullName));
			}
			
			return [match, match.getAttribute ("path") + g$.pathSeperator + match.getAttribute ("dst")];
		},
	
//------------------------------------------------------------------------------------------
// Given a class name, this function determins if an existing
// XClass has been cached.  if not, it creates a new XClass
//------------------------------------------------------------------------------------------
		// __className:String
		
		__resolveXClass: function (__className) { // XClass
			var	__XClass;			// XClass;
					
			var __c = this.m_classMap[__className];
					
			g$.trace (": XResourceManager:__resolveXClass (): ", __className, __c);
					
			if (__c == undefined) {
				var __match = this.__lookUpResourcePathByClassName (__className);
						
				var __resourceXML = __match[0];
				var __resourcePath = __match[1];
						
//				g$.trace ("$ __resolveXClass: ", __className, __resourcePath);
						
				__XClass = new c$.XClass (__className, __resourcePath, __resourceXML);
				__XClass.setClass (null);
				this.m_classMap[__className] = __XClass;				
			}
			else
			{
				__XClass = __c; // as XClass;
			}
					
			return __XClass;
		},

//------------------------------------------------------------------------------------------
// Given a XClass (Class wrapper), initialize its class definition from its resource.
// if the resource is not already cached, it creates a new XResource (Resource wrapper)
// note that XResource loads the resource asynchronously.  until the resource is completely
// loaded, this function will return null.
//------------------------------------------------------------------------------------------
		// __XClass:XClass
		
		__resolveClass: function (__XClass) { // Class
			var	__resourcePath = __XClass.getResourcePath ();
			var __resourceXML = __XClass.getResourceXML ();
			
			var __r = this.__getXResourceFromPath (__resourcePath, __resourceXML);
							
			if (__XClass.getClass () == null) {
				__XClass.setClass (__r.getClassByName (__XClass.getClassName ()));
			}
					
			return __XClass.getClass ();
		},

//------------------------------------------------------------------------------------------
		// __resourcePath:String, __resourceXML:XML
		
		__getXResourceFromPath: function (__resourcePath, __resourceXML) { // XResource
			var __r =  this.m_resourceMap[__resourcePath]; // as XResource;
						
			if (__r == null) {
				var	__XResource; // XResource;
				
				g$.trace (": getXResourceFromPath: ", this.m_rootPath, __resourcePath);
				
				__XResource = new c$.XSWFURLResource ();
				__XResource.setup (this.m_rootPath + g$.pathSeperator + __resourcePath, __resourceXML, this.m_parent, this);
						
				__XResource.loadResource ();
				
				this.m_resourceMap[__resourcePath] = __XResource;
				
				__r = __XResource;
			}
			
			return __r
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
		CLASS_TYPE: "classX",						// String
		RESOURCE_TYPE: "resource",					// String
		FOLDER_TYPE: "folder",						// String
	
//==========================================================================================
$: function () {} }, // end statics

//==========================================================================================
end: []
//==========================================================================================
	});
			
//==========================================================================================
}());