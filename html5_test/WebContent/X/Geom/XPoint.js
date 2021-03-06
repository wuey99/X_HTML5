//==========================================================================================
(function() { var c$ = {__initializing__: false};
//==========================================================================================
var n$ = g$.namespace ("X.Geom");
	
g$.import (
	function () {
		g$.import(c$, "X.Geom.*");
	}
);

//==========================================================================================
	g$.class (c$, n$, {

//==========================================================================================
	name: "XPoint", extend: Object, borrows: [],
//==========================================================================================
		
//==========================================================================================
	properties: {
//==========================================================================================
		m_x: 0,				// Number;
		m_y: 0,				// Number;
		
//==========================================================================================
$: function () {} }, // end properties

//==========================================================================================
	construct:
//==========================================================================================
		function (__x, __y) {
			if (c$.__initializing__) return;
			
//			Object.call (this);
		
			this.m_x = __x;
			this.m_y = __y;
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
		cloneX: function  () { // XPoint 
			var __point = new c$.XPoint (this.x, this.y);
			
			return __point;
		},
		
//==========================================================================================
$: function () {} }, // end methods

//==========================================================================================
	accessors: {
//==========================================================================================

//------------------------------------------------------------------------------------------
		x: {
			get: function () {
				return this.m_x;
			},
			
			set: function (__value) {
				this.m_x = __value;
			}
		},
		
//------------------------------------------------------------------------------------------
		y: {
			get: function () {
				return this.m_y;
			},
			
			set: function (__value) {
				this.m_y = __value;
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