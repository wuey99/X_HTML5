//==========================================================================================
(function() { var c$ = {__initializing__: false};
//==========================================================================================
var n$ = g$.namespace ("X.HTML5");
	
g$.import (
		function () {
			g$.import (c$, "X.Geom.*");
			g$.import (c$, "X.HTML5.*");
			g$.import (c$, "X.Task.*");
		}
	);

//==========================================================================================
	g$.class (c$, n$, {

//==========================================================================================
	name: "Stage5", extend: c$.Sprite5, borrows: [],
//==========================================================================================

//==========================================================================================
	properties: {
//==========================================================================================
		m_color: 0,							// Number;
		m_stagePos: null,					// Point5;
		
//==========================================================================================
$: function () {} }, // end properties

//==========================================================================================
	construct:
//==========================================================================================
		function () {
			if (c$.__initializing__) return;

			c$.Sprite5.call (this);
		},

//==========================================================================================
	methods: {
//==========================================================================================

//------------------------------------------------------------------------------------------
		setup: function () { // void
			g$.trace (": Stage5: setup: ");
			
			g$.stage = this;
			g$.canvas = document.getElementById ('canvasX');
			g$.context = g$.canvas.getContext ('2d');
			
			if (window.addEventListener) {
				window.addEventListener (c$.MouseEvent5.MOUSE_UP, this.__onMouseUp.bind (this), false);
			}
			else if (document.addEventListener) {
				document.addEventListener (c$.MouseEvent5.MOUSE_UP, this.__onMouseUp.bind (this), false);
			}
			else
			{
				g$.canvas.addEventListener (c$.MouseEvent5.MOUSE_UP, this.__onMouseUp.bind (this), false);
			}
			
			g$.canvas.addEventListener (c$.MouseEvent5.MOUSE_DOWN, this.__onMouseDown.bind (this), false);
			
			g$.canvas.addEventListener (c$.MouseEvent5.MOUSE_MOVE, this.__onMouseMove.bind (this), false);
		},
		
//------------------------------------------------------------------------------------------
		setupX: function () { // void
			g$.XApp.getXTaskManager ().addTask ([
				c$.XTask.LABEL, "loop",
					c$.XTask.WAIT, 0x0100,
			
					function () {
						var __m /* XMatrix */ = new c$.XMatrix ();
						
						var __context = g$.context;
						
						__context.setTransform (__m.a, __m.b, __m.c, __m.d, __m.tx, __m.ty);
						
						__context.fillStyle = this.m_color;
						__context.fillRect (0, 0, g$.canvas.width, g$.canvas.height);	
					
						this.render (__m);
					}.bind (this),
					
					c$.XTask.GOTO, "loop",
				
				c$.XTask.RETN,
			]);
		},
		
//------------------------------------------------------------------------------------------
		cleanup: function () { // void
		},

//------------------------------------------------------------------------------------------
		__onMouseUp: function (event) { // void {
		},

//------------------------------------------------------------------------------------------		
		__onMouseDown: function (event) { // void {
			this.onMouseDown (new c$.XMatrix (), this.m_stagePos);
		},

//------------------------------------------------------------------------------------------		
		__onMouseMove: function (event) { // void {	
			var __mouseX;
			var __mouseY;
			
			if (!event) {
				event = window.event;
			}
			
			if (event.pageX || event.pageY) {
				__mouseX = event.pageX;
				__mouseY = event.pageY;
			}
			else if (event.clientX  || event.clientY) {
				__mouseX = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
				__mouseY = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
			}
			
			__mouseX -= g$.canvas.offsetLeft;
			__mouseY -= g$.canvas.offsetTop;
			
			this.m_stagePos = new c$.Point5 (__mouseX, __mouseY);
	
			this.onMouseMove (new c$.XMatrix (), new c$.Point5 (__mouseX, __mouseY));
		},
		
//------------------------------------------------------------------------------------------
		reportSprites: function () { // void
			var i; /* Number */
			
			g$.trace (": numChildren: ", this.numChildren);
			
			for (i=0; i<this.numChildren; i++) {
				g$.trace (": sprite: ", i, this.getChildAt (i));
			}		
		},
		
//------------------------------------------------------------------------------------------
		setColor: function (__color /* Number */) { // void {
			this.m_color = __color;
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

//-----------------------------------------------------------------------------------------
	__tab: function (__indent) { // String
		var i;
		var tabs = "";
		
		for (i=0; i<__indent; i++) {
			tabs += "\t";
		}
		
		return tabs;
	},
	
//==========================================================================================
$: function () {} }, // end statics

//==========================================================================================
end: []
//==========================================================================================
	});
			
//==========================================================================================
}());