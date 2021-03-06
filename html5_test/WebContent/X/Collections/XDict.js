//==========================================================================================
(function() { var c$ = {__initializing__: false};
//==========================================================================================
var n$ = g$.namespace ("X.Collections");

//==========================================================================================
	g$.class (c$, n$, {

//==========================================================================================
	name: "XDict", extend: Object, borrows: [],
//==========================================================================================
		
//==========================================================================================
	properties: {
//==========================================================================================
		m_val: null,		// hashed key to values
		m_obj: null,		// hashed key to original object key
		
//==========================================================================================
$: function () {} }, // end properties

//==========================================================================================
	construct:
//==========================================================================================
		function () {
			if (c$.__initializing__) return;
			
//			Object.call (this);
		
			this.m_val = {};
			this.m_obj = {};
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
		// __key:*
		exists: function (__key) { // Boolean
			return this.m_val[this.hash (__key)] != undefined;
		},

//------------------------------------------------------------------------------------------
		// __key:*
		get: function (__key) { // *
			return this.m_val[this.hash (__key)];
		},
	
//------------------------------------------------------------------------------------------
		// __key:*, __value:*
		put: function (__key, __value) { // void
			var __hash = this.hash (__key);
			
			this.m_val[__hash] = __value;
			this.m_obj[__hash] = __key;
		},
		
//------------------------------------------------------------------------------------------
		// __key:*
		remove: function (__key) { // void
			var __hash = this.hash (__key);
			
			if (this.m_val[__hash] != undefined) {
				delete this.m_val[__hash];
				delete this.m_obj[__hash]
			}
		},
		
//------------------------------------------------------------------------------------------
		length: function () { // Number
			return this.m_val.length;
		},

//------------------------------------------------------------------------------------------
		// __callback:Function
		forEach: function (__callback /* Function */) { // void
			var __key;
		
			for (__key in this.m_val) {
				__callback (this.m_obj[__key]);
			}
		},
		
//------------------------------------------------------------------------------------------
		// __key:Object
		hash: function (__key) { // String	
			var __hash = typeof __key + " ";
			
			if (__key instanceof Object) {
				if (__key.__hash__ == undefined) {
					__key.__hash__ = c$.XDict.unique_id++;
				}
				
				__hash += __key.__hash__;
			}
			else
			{
				__hash += __key.toString ();
			}

			return __hash;
		},
	
//==========================================================================================
$: function () {} }, // end methods

//==========================================================================================
statics: {
//==========================================================================================
	unique_id: 0,

//==========================================================================================
$: function () {} }, // end statics

//==========================================================================================
end: []
//==========================================================================================
	});
			
//==========================================================================================
}());