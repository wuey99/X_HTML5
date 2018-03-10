//==========================================================================================
(function() { var c$ = {__initializing__: false};
//==========================================================================================
var n$ = g$.namespace ("X.HTML5");
	
g$.import (
	function () {
		g$.import (c$, "X.Collections.*");
		g$.import (c$, "X.HTML5.*");
		g$.import (c$, "X.Geom.*");
	}
);

//==========================================================================================
	g$.class (c$, n$, {

//==========================================================================================
	name: "ImageStrip5", extend: c$.Image5, borrows: [],
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
		
			c$.Image5.call (this);
		},

//==========================================================================================
	methods: {
//==========================================================================================
		setup: function (
				__src /* String */,
				__width, /* Number */
				__totalWidth, /* Number */
				__height, /* Number */
				__callback
				) { // void
			
			c$.Image5.prototype.setup.call (this, __src, __width, __totalWidth, __height, __callback);
		},
			
//------------------------------------------------------------------------------------------
		cleanup: function () { // void
		},
		
//------------------------------------------------------------------------------------------
		drawImage: function (
			__context, /* context */
			__frameNumber /* Number */
			) { // void
					
			if (!this.isReady ()) {
				return;
			}

			__context.drawImage (
					this.m_image,
					__frameNumber * this.m_width, 0, this.m_width, this.m_height,
					0, 0,
					this.m_width, this.m_height
				);
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