//==========================================================================================
(function() { var c$ = {__initializing__: false};
//==========================================================================================
var n$ = g$.namespace ("X.Resource");
	
g$.import (
		function () {
			g$.import (c$, "X.Resource.Manager.*");
		}
	);

//==========================================================================================
	g$.class (c$, n$, {

//==========================================================================================
	name: "XResource", extend: Object, borrows: [],
//==========================================================================================
		m_resourcePath: "",				// String;
		m_resourceXML: null,			// XSimpleXMLNode;
	
//==========================================================================================
	properties: {
//==========================================================================================
		
//==========================================================================================
$: function () {} }, // end properties

//==========================================================================================
	construct:
//==========================================================================================
		function () {
			if (c$.__initializing__) return;
		
//			Object.call (this);
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
		// __resourcePath:String, __resourceXML:XSimpleXMLNode,
		// __parent:Sprite,
		// __resourceManager:XSubResourceManager
		
		setup: function (
			__resourcePath, __resourceXML,
			__parent,
			__resourceManager
			) { // void
		},
		
//------------------------------------------------------------------------------------------		
		loadResource: function () { // void
		},
		
//------------------------------------------------------------------------------------------
		kill: function () { // void
		},
		
//------------------------------------------------------------------------------------------
		getResourcePath: function () { // String
			return this.m_resourcePath;
		},

//------------------------------------------------------------------------------------------
		getResourceXML: function () { // XSimpleXMLNode
			return this.m_resourceXML;
		},

//------------------------------------------------------------------------------------------
		getAllClassNames: function () { // Array
			var __xmlList = this.m_resourceXML.child ("*");
			var i;
			var __classNames = new Array ();
						
			for (i=0; i<__xmlList.length; i++) {
				__classNames.push (__xmlList[i].getAttribute ("name"));	
			}
			
			return __classNames;
		},
		
//------------------------------------------------------------------------------------------
		// __className:String
		
		getClassByName: function (__className) { // Class
			return null;
		},
		
//------------------------------------------------------------------------------------------
		getAllClasses: function () { // Array
			return null;
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