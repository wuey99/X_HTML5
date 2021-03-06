//==========================================================================================
(function() { var c$ = {__initializing__: false};
//==========================================================================================
var n$ = g$.namespace ("X.XML");
	
g$.import (
	function () {
		g$.import (c$, "X.XML.*");
	}
);

//==========================================================================================
	g$.class (c$, n$, {

//==========================================================================================
	name: "XSimpleXMLDocument", extend: c$.XSimpleXMLNode, borrows: [],
//==========================================================================================
		
//==========================================================================================
	construct:
//==========================================================================================
		function () {
			if (c$.__initializing__) return;
		
			c$.XSimpleXMLNode.call (this);
		},

//==========================================================================================
	methods: {
//==========================================================================================

//------------------------------------------------------------------------------------------
		toXMLString: function (__indent) { // String
			__indent = __indent ? __indent : 0;
			
			var __xmlString = "<?xml version='1.0' encoding='UTF-8'?>\n";
			
			__xmlString +=
				this.__tab (__indent) +
				c$.XSimpleXMLNode.prototype.toXMLString.call (this, __indent);
			
			return __xmlString;	
		},

//------------------------------------------------------------------------------------------
		setup: function () { // void
		},
		
//------------------------------------------------------------------------------------------
		cleanup: function () { // void
		},
	
//==========================================================================================
$: function () {} }, // end methods

//==========================================================================================
end: []
//==========================================================================================
	});
			
//==========================================================================================
}());