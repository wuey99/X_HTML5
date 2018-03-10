//==========================================================================================
(function() { var c$ = {__initializing__: false};
//==========================================================================================
var n$ = g$.namespace ("X.HTML5");
	
g$.import (
	function () {
		g$.import (c$, "X.HTML5.*");
	}
);

//==========================================================================================
	g$.class (c$, n$, {

//==========================================================================================
	name: "Image5", extend: Object, borrows: [],
//==========================================================================================

//==========================================================================================
	properties: { 
//==========================================================================================
		m_image: null,						// Image;
		m_ready: false,						// Boolean;
		m_width: 0,							// Number;
		m_totalWidth: 0,					// Number;
		m_height: 0,						// Number;
		
//==========================================================================================
$: function () {} }, // end properties

//==========================================================================================
	construct:
//==========================================================================================
		function () {
			if (c$.__initializing__) return;
		
			Object.call (this);
			
			this.m_image = null;
			this.m_ready = false;
		},

//==========================================================================================
	methods: {
//==========================================================================================

//------------------------------------------------------------------------------------------
		setup: function (
				__src /* String */,
				__width, /* Number */
				__totalWidth, /* Number */
				__height, /* Number */
				__callback
				) { // void
			
			this.m_width = __width;
			this.m_totalWidth = __totalWidth;
			this.m_height = __height;
	
			this.m_image = new Image ();
			this.m_image.src = __src;
			this.m_image.onload = function () {
				this.m_ready = true;
				__callback ();
			}.bind (this);
		},
		
//------------------------------------------------------------------------------------------
		cleanup: function () { // void
		},

//------------------------------------------------------------------------------------------
		getImage: function () { // Image
			return this.m_image;
		},
		
//------------------------------------------------------------------------------------------
		drawImage: function (
				__context, /* context */
				__frameNumber /* Number */
				) { // void
			
			__context.drawImage (
					this.m_image,
					0, 0,
					this.m_width, this.m_height
				);
		},

//------------------------------------------------------------------------------------------
		isReady: function () { // Boolean
			return this.m_ready;
		},
		
//------------------------------------------------------------------------------------------
		getWidth: function () { // Number
			return this.m_width;
		},
		
//------------------------------------------------------------------------------------------
		getTotalWidth: function () { // Number
			return this.m_totalWidth;
		},
		
//------------------------------------------------------------------------------------------
		getHeight: function () { // Number
			return this.m_height;
		},
		
//------------------------------------------------------------------------------------------
		toString: function () { // String
			return null;
		},

//==========================================================================================
$: function () {} }, // end methods

//==========================================================================================
accessors: {
//==========================================================================================

//------------------------------------------------------------------------------------------
	width: {
		get: function () { // Number
			return this.m_width;
		},
		
		set: function (__value /* Number */) {
			this.m_width = __value;
		}
	},

//------------------------------------------------------------------------------------------
	height: {
		get: function () { // Number
			return this.m_height;
		},
		
		set: function (__value /* Number */) {
			this.m_height = __value;
		}
	},

//------------------------------------------------------------------------------------------
	numFrames: {
		get: function () { // Number
			return this.m_totalWidth / this.m_width;
		},
		
		set: function (__value /* Number */) {
		}
	},
	
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