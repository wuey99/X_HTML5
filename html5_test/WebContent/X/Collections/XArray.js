//==========================================================================================
(function() { var c$ = {__initializing__: false};
//==========================================================================================
var n$ = g$.namespace ("X.Collections");
	
//==========================================================================================
	g$.class (c$, n$, {

//==========================================================================================
	name: "XArray", extend: Object, borrows: [],
//==========================================================================================
		
//==========================================================================================
	construct:
//==========================================================================================
		function () {
			if (c$.__initializing__) return;
		
//			Object.call (this);
		
			this.m_array = {};
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
		push: function (__value) { // void
			m_array.push (__value);
		},
		
//------------------------------------------------------------------------------------------
		pop: function () { // *
			return m_array.pop ();
		},
		
//------------------------------------------------------------------------------------------
		get: function (__key) { // *
			return this.m_array[__key];
		},
	
//------------------------------------------------------------------------------------------
		put: function (__key, __value) { // void
			this.m_array[__key] = __value;
		},
		
//------------------------------------------------------------------------------------------
		remove: function (__key) { // void
		},
		
//------------------------------------------------------------------------------------------
		length: function () { // Number
			return this.m_array.length;
		},

//------------------------------------------------------------------------------------------
		indexOf: function (__value) { // int
			return m_array.indexOf (__value);
		},
	
//==========================================================================================
$: function () {} }, // end methods

//==========================================================================================
end: []
//==========================================================================================
	});
			
//==========================================================================================
}());