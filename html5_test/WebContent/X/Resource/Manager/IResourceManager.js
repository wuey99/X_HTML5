//==========================================================================================
(function() { var c$ = {__initializing__: false};
//==========================================================================================
var n$ = g$.namespace ("X.Resource.Manager");
	
g$.import (
		function () {
			g$.import (c$, "X.XML.*");
		}
	);

//==========================================================================================
	g$.class (c$, n$, {

//==========================================================================================
	name: "IResourceManager", extend: Object, borrows: [],
//==========================================================================================

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
		// __xml: XSimpleXMLNode
		deleteResourceXML: function (__xml) { // void
		},
		
//------------------------------------------------------------------------------------------
		// item: XSimpleXMLNode
		// __xmlToInsert: XSimpleXMLNode
		insertResourceXML: function (item, __xmlToInsert) { // void
		},

//------------------------------------------------------------------------------------------
		// __resourceName: String
		findResourceXMLFromName: function (__resourceName) { // XSimpleXMLNode
			return null;
		},
		
//------------------------------------------------------------------------------------------
		// __className: String
		getClassByName: function (__className) { // Class
			return null;
		},

//------------------------------------------------------------------------------------------
		// __className: String
		unloadClass: function (__className) { // void
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