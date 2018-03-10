//==========================================================================================
(function() { var c$ = {__initializing__: false};
//==========================================================================================
var n$ = g$.namespace ("X.Utils");
	
//==========================================================================================
	g$.class (c$, n$, {

//==========================================================================================
	name: "XClassNameToIndex", extend: Object, borrows: [],
//==========================================================================================

//==========================================================================================
	properties: {
//==========================================================================================
		m_classNamesStrings: null,			// Array;
		m_classNamesCounts: null,			// Array;
		m_freeClassNameIndexes:null,		// Array;
	
//==========================================================================================
$: function () {} }, // end properties

//==========================================================================================
	construct:
//==========================================================================================
		function () {
			if (c$.__initializing__) return;
		
//			Object.call (this);
		
			this.m_classNamesStrings = new Array ();
			this.m_classNamesCounts = new Array ();
			this.m_freeClassNameIndexes = new Array ();
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
// given an index, find its className.
//------------------------------------------------------------------------------------------
		// __index:int
		getClassNameFromIndex: function (__index) { // String
			return this.m_classNamesStrings[__index];
		},

//------------------------------------------------------------------------------------------
// given as className assign a unique index to it.
//------------------------------------------------------------------------------------------
		// __className:String
		getIndexFromClassName: function (__className) { // int
			var index; // int;
					
// look up the index associated with the className
			index = this.m_classNamesStrings.indexOf (__className);
					
// if no index can be found, create a new index
			if (index == -1) {
						
// create a new className if there are no previously deleted ones
				if (this.m_freeClassNameIndexes.length == 0) {		
					this.m_classNamesStrings.push (__className);
					this.m_classNamesCounts.push (1);
					index = this.m_classNamesStrings.indexOf (__className);
				}
// reclaim a previously deleted className's index
				else
				{	
					index = this.m_freeClassNameIndexes.pop ();
					this.m_classNamesStrings[index] = __className;	
					this.m_classNamesCounts[index]++;	
				}		
			}
// increment the className's ref count
			else
			{		
				this.m_classNamesCounts[index]++;
			}
					
			return index;
		},
	
//------------------------------------------------------------------------------------------
// remove a className from the list
//
// classNames aren't physically removed from the list: the entry is cleared out and the index
// in the Array is made available for reuse.
//------------------------------------------------------------------------------------------
		// __index:int
		removeIndexFromClassNames:function (__index) { //void
			this.m_classNamesCounts[__index]--;
					
			if (this.m_classNamesCounts[__index] == 0) {
				this.m_classNamesStrings[__index] = "";
						
				this.m_freeClassNameIndexes.push (__index);
			}
		},
				
//------------------------------------------------------------------------------------------
		getAllClassNames: function () { // Array
			var __classNames = new Array (); // Array
			var i; // Number;
			
			for (i=0; i<this.m_classNamesStrings.length; i++) {
				if (this.m_classNamesStrings[i] != "") {
					__classNames.push (this.m_classNamesStrings[i]);
				}
			}
			
			return __classNames;
		},

//------------------------------------------------------------------------------------------
		// __index:Number
		getClassNameCount: function (__index /* Number */) { // Number {
			return this.m_classNamesCounts[__index];
		},
				
//------------------------------------------------------------------------------------------
		serialize: function () { // XSimpleXMLNode
			var __xml = new XSimpleXMLNode ();
			
			__xml.setupWithParams ("classNames", "", []);
			
			var i; // Number;
			
			for (i=0; i<this.m_classNamesStrings.length; i++) {
				var __attribs = [
					"index",		i,
					"name",			this.m_classNamesStrings[i],
					"count",		this.m_classNamesCounts[i]					
				];
				
				var __className = new XSimpleXMLNode ();
				
				__className.setupWithParams ("className", "", __attribs);
				
				__xml.addChildWithXMLNode (__className);
			}
			
			return __xml;
		},
		
//------------------------------------------------------------------------------------------
	// __xml:XSimpleXMLNode
	deserialize: function (__xml /* XSimpleXMLNode */) { //void {
		this.m_classNamesStrings = new Array ();
		this.m_classNamesCounts = new Array ();
		this.m_freeClassNameIndexes = new Array ();
		
//		trace (": XClassNameToIndex: deserialize: ");
		
		var __xmlList /* Array */ = __xml.child ("classNames")[0].child ("className");
		
		var i; // Number;
		var __name; // String;
		var __count; // Number;
		
		for (i=0; i<__xmlList.length; i++) {
			__name = __xmlList[i].getAttribute ("name");
			__count = __xmlList[i].getAttribute ("count");
			
//			trace (": XClassNameToIndex: deserialize: ", __name, __count);
			
			this.m_classNamesStrings.push (__name);
			
//don't use the count because the rest of the deserialization code is going to add
//the items back to the XMap.
//			m_classNamesCounts.push (__count);
			this.m_classNamesCounts.push (0);
		}
		
		for (i=0; i<this.m_classNamesStrings.length; i++) {
			if (this.m_classNamesStrings[i] == "") {
				this.m_freeClassNameIndexes.push (i);
			}
		}
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