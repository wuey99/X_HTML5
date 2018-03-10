//==========================================================================================
(function() { var c$ = {__initializing__: false};
//==========================================================================================
var n$ = g$.namespace ("X.XML");
	
//==========================================================================================
	g$.class (c$, n$, {

//==========================================================================================
	name: "XSimpleXMLNode", extend: Object, borrows: [],
//==========================================================================================
		
//==========================================================================================
	construct:
//==========================================================================================
		function () {
			if (c$.__initializing__) return;
		
//			Object.call (this);
			
			this.m_tag = "";
			this.m_text = "";
			
			this.m_attribs = new Array ();
			this.m_attribsMap = new Object ();
			this.m_children = new Array ();
			this.m_parent = null;
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
		setupWithParams: function (__tag, __text, __attrib) { // void
			this.m_tag = __tag;
			this.m_text = __text;
			var i;
			
			for (i=0; i<__attribs.length; i+=2) {
				this.m_attribs.push (__attribs[i+0]);
				this.m_attribsMap[__attribs[i+0]] = __attribs[i+1];
			}
		},
	
//------------------------------------------------------------------------------------------
		setupWithXMLString: function (__xmlString) { // void
			g$.trace (": setupWithXMLString: ");
			
			var __xmlDoc = new g$.XMLDoc (__xmlString);

			this.setupWithXML (__xmlDoc.docNode);													
		},

//------------------------------------------------------------------------------------------
		setupWithXML: function (__xml) { // void
			var i;
			
//------------------------------------------------------------------------------------------
			this.m_tag = __xml.tagName;

			if (__xml.getElements ().length) {
				this.m_text = "";
			}
			else
			{
				this.m_text = __xml.getText ();
			}
	
//------------------------------------------------------------------------------------------
			this.m_attribs = new Array ();
			this.m_attribsMap = new Object ();
			
			var __attribNames = __xml.getAttributeNames ();
			
			for (i = 0; i<__attribNames.length; i++) {
				var __key = __attribNames[i];
				this.m_attribs.push (__key);
				this.m_attribsMap[__key] = __xml.getAttribute (__key);
			}
		
//------------------------------------------------------------------------------------------	
			this.m_children = this.__getXMLChildren (__xml);
		},

//------------------------------------------------------------------------------------------
		__getXMLChildren: function (__xml) { // Array
			var i;
			var __xmlList;
			var __children = new Array ();
				
//------------------------------------------------------------------------------------------
			__xmlList = __xml.getElements ();
			
			for (i=0; i<__xmlList.length; i++) {
				var __xmlNode = new c$.XSimpleXMLNode ();
				__xmlNode.setupWithXML (__xmlList[i]);
				__children.push (__xmlNode);	
			}

//------------------------------------------------------------------------------------------
			return __children;
		},
		
//------------------------------------------------------------------------------------------
		addChildWithParams: function (__tag, __text, __attribs) { // XSimpleXMLNode
			var __xmlNode = new c$.XSimpleXMLNode ();
			__xmlNode.setupWithParams (__tag, __text, __attribs);
			
			__xmlNode.setParent (this);
			
			this.m_children.push (__xmlNode);
			
			return __xmlNode;
		},
		
//------------------------------------------------------------------------------------------
		addChildWithXMLString: function (__xmlString) { // XSimpleXMLNode
			var __xmlNode = new c$.XSimpleXMLNode ();
			__xmlNode.setupWithXMLString (__xmlString);
		
			__xmlNode.setParent (this);
			
			this.m_children.push (__xmlNode);
			
			return __xmlNode;
		},
		
//------------------------------------------------------------------------------------------
		addChildWithXMLNode: function (__xmlNode) { // XSimpleXMLNode
			__xmlNode.setParent (this);
			
			this.m_children.push (__xmlNode);
			
			return __xmlNode;
		},
		
//------------------------------------------------------------------------------------------
		removeChild: function (__xmlNode) { // void
		},
		
//------------------------------------------------------------------------------------------
		getChildren: function () { // Array
			return this.m_children;
		},
		
//------------------------------------------------------------------------------------------
		addAttribute: function (__name, __value) { // void
			this.m_attribs.push (__name);
			this.m_attribsMap[__name] = __value;
		},
		
//-----------------------------------------------------------------------------------------
		hasAttribute: function (__name /* String */) { // Boolean {
			return this.m_attribsMap[__name] == undefined ? false : true;
		},
		
//-----------------------------------------------------------------------------------------
		getAttribute: function (__name) { // *
			return this.m_attribsMap[__name];
		},
			
//------------------------------------------------------------------------------------------
		getText: function  () { // String
			return this.m_text;
		},
	
//------------------------------------------------------------------------------------------
		__tab: function (__indent) { // String
			var i;
			var tabs = "";
			
			for (i=0; i<__indent; i++) {
				tabs += "\t";
			}
			
			return tabs;
		},

//------------------------------------------------------------------------------------------
		toXMLString: function (__indent) { // String
			__indent = __indent ? __indent : 0;
			
			var __string = "";
			
			__string += this.__tab (__indent) + "<" + this.m_tag;
					
			for (var i = 0; i<this.m_attribs.length; i++) {
				var __key = this.m_attribs[i];	
				__string += " " + __key + "=" + "\"" + this.m_attribsMap[__key] + "\"";	
			}
			
			if (this.m_text != "" || this.m_children.length) {
				__string += ">\n";
				
				if (this.m_text != "") {
					__string += this.__tab (__indent+1) + this.m_text + "\n";
				}
				
				if (this.m_children.length != 0) {
					var i;
					
					for (i=0; i<this.m_children.length; i++) {
						__string += this.m_children[i].toXMLString (__indent+1);
					}
				}
				
				__string += this.__tab (__indent) + "</" + this.m_tag + ">\n";
			}
			else
			{
				__string += "/>\n";
			}
			
			return __string;
		},
		
//------------------------------------------------------------------------------------------
		parent: function () { // XSimpleXMLNode
			return this.m_parent;
		},
		
//------------------------------------------------------------------------------------------
		setParent: function (__parent) { // void
			this.m_parent = __parent;
		},

//------------------------------------------------------------------------------------------
		localName: function () { // String
			return this.m_tag;
		},

//------------------------------------------------------------------------------------------
		insertChildAfter: function (__dst, __src) { // void
		},
	
//------------------------------------------------------------------------------------------
		child: function (__tag) { // Array
			if (__tag == "*") {
				return this.m_children;
			}
			
			var __list = new Array ();
			
			var i;
			
			for (i=0; i<this.m_children.length; i++) {
				if (this.m_children[i].tag == __tag) {
					__list.push (this.m_children[i]);
				}
			}
			
			return __list;
		},
		
//==========================================================================================
$: function () {} }, // end methods

//==========================================================================================
accessors: {
//==========================================================================================

//------------------------------------------------------------------------------------------
	tag: {
		get: function () {
			return this.m_tag;
		},
		
		set: function (__value) {
			this.m_tag = __value;
		}
	},
	
//==========================================================================================
$: {} }, // end accessors

//==========================================================================================
end: []
//==========================================================================================
	});
			
//==========================================================================================
}());