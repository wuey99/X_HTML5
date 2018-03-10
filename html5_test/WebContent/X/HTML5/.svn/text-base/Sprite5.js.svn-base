//==========================================================================================
(function() { var c$ = {__initializing__: false};
//==========================================================================================
var n$ = g$.namespace ("X.HTML5");
	
g$.import (
	function () {
		g$.import (c$, "X.Collections.*");
		g$.import (c$, "X.Geom.*");
		g$.import (c$, "X.HTML5.*");
	}
);

//==========================================================================================
	g$.class (c$, n$, {

//==========================================================================================
	name: "Sprite5", extend: c$.DisplayObjectContainer5, borrows: [],
//==========================================================================================

//==========================================================================================
	properties: {
//==========================================================================================
		alpha: 1.0,					// Number;
		rotation: 0.0,				// Number;
		scaleX: 1.0,				// Number;
		scaleY: 1.0,				// Number;
		visible: false,				// Boolean;
		width: 0,					// Number;
		height: 0,					// Number;
		m_mouseX: 0,				// Number;
		m_mouseY: 0,				// Number;
		m_stageX: 0,				// Number;
		m_stageY: 0,				// Number;
		stage: null,				// Class;
		m_image5: null,				// Image5;
		x: 0,						// Number;
		y: 0,						// Number;
		regX: 0,					// Number;
		regY: 0,					// Number;
		graphics: null,				// Graphics;
		cache: null,				// Canvas;
		mouseEnabled: false,		// Boolean;
		m_isOver: false,			// Boolean;
		
		m_numChildEvents: 0,		// Number;
		m_CLICKS: null,				// XDict;
		m_DOUBLE_CLICKS: null,		// XDict;
		m_MOUSE_DOWNS: null,		// XDict;
		m_MOUSE_MOVES: null,		// XDict;
		m_MOUSE_OUTS: null,			// XDict;
		m_MOUSE_OVERS: null,		// XDict;
		m_MOUSE_UPS: null,			// XDict;
		
//==========================================================================================
$: function () {} }, // end properties

//==========================================================================================
	construct:
//==========================================================================================
		function () {
			if (c$.__initializing__) return;
		
			c$.DisplayObjectContainer5.call (this);
				
			this.m_image5 = null;
			
			this.graphics = null;
			this.cache = null;
			
			this.m_numChildEvents = 0;
			this.m_CLICKS = new c$.XDict ();
			this.m_DOUBLE_CLICKS = new c$.XDict ();
			this.m_MOUSE_DOWNS = new c$.XDict ();
			this.m_MOUSE_MOVES = new c$.XDict ();
			this.m_MOUSE_OUTS = new c$.XDict ();
			this.m_MOUSE_OVERS = new c$.XDict ();
			this.m_MOUSE_UPS = new c$.XDict ();
		},

//==========================================================================================
	methods: {
//==========================================================================================

//------------------------------------------------------------------------------------------
		setup: function () { // void
		},
		
//------------------------------------------------------------------------------------------
		cleanup: function () { // void
			this.removeAllListeners ();
		},

//------------------------------------------------------------------------------------------
		setImage5: function (__image5 /* Image5 */) { // void
			this.m_image5 = __image5;
		},
		
//------------------------------------------------------------------------------------------
		getImage5: function () { // void
			return this.m_image5;
		},

//------------------------------------------------------------------------------------------
		draw: function (__context, /* Context2d */ __m /* XMatrix */) { // void {
			if (this.cache != null) {
				__context.drawImage (
					this.cache,
					0, 0
				);
			}
		},

//------------------------------------------------------------------------------------------
		drawImage5: function (__context, /* Context2d */ __m /* XMatrix */) { // void	
		},

//------------------------------------------------------------------------------------------
		createGraphics: function (__width, __height) { // void {
			if (this.graphics == null) {
				this.graphics = document.createElement ("canvas");
			}
			
			this.graphics.width = __width;
			this.graphics.height = __height;
			
			var __graphicsContext = this.graphics.getContext ("2d");
			__graphicsContext.setTransform (1, 0, 0, 1, 0, 0);
		},
		
//------------------------------------------------------------------------------------------
		createCache: function (__width, __height) { // void {
			if (this.cache == null) {
				this.cache = document.createElement ("canvas"); 
			}
			
			this.cache.width = __width;
			this.cache.height = __height;
			
			var __cacheContext = this.cache.getContext ("2d");
			__cacheContext.setTransform (1, 0, 0, 1, 0, 0);	
		},

//------------------------------------------------------------------------------------------
		renderCache: function () { // void {
		},
		
//------------------------------------------------------------------------------------------
		render: function (__m /* XMatrix */) { // void {
			var __r = this.rotation * Math.PI/180;
			var __cos = Math.cos (__r);
			var __sin = Math.sin (__r);

			__m.append (
				new c$.XMatrix (
					__cos * this.scaleX,
					__sin * this.scaleX,
					-__sin * this.scaleY,
					__cos * this.scaleY,
					this.x,
					this.y
				)
			);

			__m.append (c$.XMatrix.createTranslation (-this.regX, -this.regY));
			
			var __context = g$.context;
			__context.setTransform (__m.a, __m.b, __m.c, __m.d, __m.tx, __m.ty);
			this.draw (__context, __m);
			
			var i; /* Number */
			
			for (i=0; i<this.numChildren; i++) {
				var __child /* Sprite5 */ = this.getChildAt (i);
						
				__child.render (__m.clone ());
			}
		},
		
//------------------------------------------------------------------------------------------
		globalToLocal: function (__point5 /* Point5 */) { // Point5		
			var __m /* XMatrix */ = this.getConcatenatedMatrix ();
			__m.invert ();
			__m.append (new c$.XMatrix (1, 0, 0, 1, __point5.x, __point5.y));
			
			return new c$.Point5 (__m.tx, __m.ty);
		},
		
//------------------------------------------------------------------------------------------
		localToGlobal: function (__point5 /* Point5 */) { // Point5		
			var __m /* XMatrix */ = this.getConcatenatedMatrix ();
			__m.append (new c$.XMatrix (1, 0, 0, 1, __point5.x, __point5.y));
			
			return new c$.Point5 (__m.tx, __m.ty);
		},

//------------------------------------------------------------------------------------------
		getConcatenatedMatrix: function () { // XMatrix {
			var __m /* XMatrix */ = new c$.XMatrix ();

			var __sprite = this;
			
			do {
				var __r = __sprite.rotation * Math.PI/180;
				var __cos = Math.cos (__r);
				var __sin = Math.sin (__r);
				
				__m.concat (c$.XMatrix.createTranslation (-__sprite.regX, -__sprite.regY));
				
				__m.concat (
					new c$.XMatrix (
						__cos * __sprite.scaleX,
						__sin * __sprite.scaleX,
						-__sin * __sprite.scaleY,
						__cos * __sprite.scaleY,
						__sprite.x,
						__sprite.y
					)
				);
				
				__sprite = __sprite.parent;
			} while (__sprite != null);
			
			return __m;
		},
		
//------------------------------------------------------------------------------------------
		toString: function () { // String
			return null;
		},

//------------------------------------------------------------------------------------------
		// type:String
		// listener:Function
		// useCapture:Boolean = false
		// priority:int = 0
		// useWeakReference:Boolean = false
		
		addEventListener: function (__type, __listener, __useCapture, __priority, __useWeakReference) { // void {
			switch (__type) {
				case c$.MouseEvent5.CLICK:
					this.m_CLICKS.put (__listener, 0);
					break;
				case c$.MouseEvent5.DOUBLE_CLICK:
					this.m_DOUBLE_CLICKS.put (__listener, 0);
					break;
				case c$.MouseEvent5.MOUSE_DOWN:
					this.m_MOUSE_DOWNS.put (__listener, 0);
					break;
				case c$.MouseEvent5.MOUSE_MOVE:
					this.m_MOUSE_MOVES.put (__listener, 0);
					break;
				case c$.MouseEvent5.MOUSE_OUT:
					this.m_MOUSE_OUTS.put (__listener, 0);
					break;
				case c$.MouseEvent5.MOUSE_OVER:
					this.m_MOUSE_OVERS.put (__listener, 0);
					break;
				case c$.MouseEvent5.MOUSE_UP:
					this.m_MOUSE_UPS.put (__listener, 0);
					break;
			}
			
			var __this = this.parent;
			
			while (__this != null) {
				g$.trace (": addEventListener: ", __this);
				
				__this.m_numChildEvents++;
				
				__this = __this.parent;
			}
		},

//------------------------------------------------------------------------------------------
		// type:String
		// listener:Function
		// useCapture:Boolean = false
		
		removeEventListener: function (__type, __listener, __useCapture) { // void {
			switch (__type) {
				case c$.MouseEvent5.CLICK:
					this.m_CLICKS.remove (__listener, 0);
					break;
				case c$.MouseEvent5.DOUBLE_CLICK:
					this.m_DOUBLE_CLICKS.remove (__listener, 0);
					break;
				case c$.MouseEvent5.MOUSE_DOWN:
					this.m_MOUSE_DOWNS.remove (__listener, 0);
					break;
				case c$.MouseEvent5.MOUSE_MOVE:
					this.m_MOUSE_MOVES.remove (__listener, 0);
					break;
				case c$.MouseEvent5.MOUSE_OUT:
					this.m_MOUSE_OUTS.remove (__listener, 0);
					break;
				case c$.MouseEvent5.MOUSE_OVER:
					this.m_MOUSE_OVERS.remove (__listener, 0);
					break;
				case c$.MouseEvent5.MOUSE_UP:
					this.m_MOUSE_UPS.remove (__listener, 0);
					break;
			}
			
			var __this = this.parent;
			
			while (__this != null) {
				__this.m_numChildEvents--;
				
				__this = __this.parent;
			}
		},

//------------------------------------------------------------------------------------------
		removeAllListeners: function () { // void {	
			this.m_CLICKS.forEach (
				function (x) { // void
					this.m_CLICKS.remove (x);
				}.bind (this)
			);
			
			this.m_DOUBLE_CLICKS.forEach (
				function (x) { // void
					this.m_DOUBLE_CLICKS.remove (x);
				}.bind (this)
			);

			this.m_MOUSE_DOWNS.forEach (
				function (x) { // void
					this.m_MOUSE_DOWNS.remove (x);
				}.bind (this)
			);
			
			this.m_MOUSE_MOVES.forEach (
				function (x) { // void
					this.m_MOUSE_MOVES.remove (x);
				}.bind (this)
			);
			
			this.m_MOUSE_OUTS.forEach (
				function (x) { // void
					this.m_MOUSE_OUTS.remove (x);
				}.bind (this)
			);
			
			this.m_MOUSE_OVERS.forEach (
				function (x) { // void
					this.m_MOUSE_OVERS.remove (x);
				}.bind (this)
			);
			
			this.m_MOUSE_UPS.forEach (
				function (x) { // void
					this.m_MOUSE_UPS.remove (x);
				}.bind (this)
			);
		},		

//------------------------------------------------------------------------------------------
		onMouseDown: function (__m /* XMatrix */, __stagePos) { // void {	
			if (this.numChildEvents) {		
				var __child; /* Sprite5 */

				var i; /* Number */
				
				for (i=this.numChildren-1; i >= 0; i--) {
					__child = this.getChildAt (i);
		
					if (__child.onMouseDown (__m, __stagePos)) {		
						return true;
					}
				}
			}

			this.m_isOver = false;
			
			this.m_MOUSE_DOWNS.forEach (
				function (__listener) {
					var __localPos /* Point5 */ = this.globalToLocal (__stagePos);
					
					if (__localPos.x >= this.x && __localPos.x < this.x + this.width &&
						__localPos.y >= this.y && __localPos.y < this.y + this.height) {
						
						this.m_isOver = true;
						
						__listener (
							new c$.MouseEvent5 (
								c$.MouseEvent5.MOUSE_DOWN,
								this.mouseX, this.mouseY,
								this.stageX, this.stageY
							)
						);
					}
				}.bind (this)
			);

			return this.m_isOver;
		},
		
//------------------------------------------------------------------------------------------
		onMouseMove: function (__m /* XMatrix */, __stagePos) {			
			if (this.numChildEvents) {
				var __child; /* Sprite5 */
				
				var i; /* Number */
				
				for (i=this.numChildren-1; i >= 0; i--) {
					__child = this.getChildAt (i);
						
					if (__child.onMouseMove (__m.clone (), __stagePos)) {
						return true;
					}
				}
			}
					
			this.m_isOver = false;
			
			this.m_MOUSE_MOVES.forEach (
				function (__listener) {
					var __localPos /* Point5 */ = this.globalToLocal (__stagePos);
						
					if (__localPos.x >= this.x && __localPos.x < this.x + this.width &&
						__localPos.y >= this.y && __localPos.y < this.y + this.height) {
			
						this.m_isOver = true;
						
						this.m_mouseX = __localPos.x;
						this.m_mouseY = __localPos.y;
							
						this.m_stageX = __stagePos.x;
						this.m_stageY = __stagePos.y;
							
						__listener (
							new c$.MouseEvent5 (
								c$.MouseEvent5.MOUSE_MOVE,
								__localPos.x, __localPos.y,
								__stagePos.x, __stagePos.y
							)
						);
					}
				}.bind (this)
			);
			
			return this.m_isOver;
		},
		
//==========================================================================================
$: function () {} }, // end methods

//==========================================================================================
accessors: {
//==========================================================================================

//------------------------------------------------------------------------------------------
	image5: {
		get: function () { // Image5
			return this.m_image5;
		},
		
		set: function (__value /* Image5 */) {
			this.m_image5 = __value;
		}
	},
	
	mouseX: {
		get: function () { // Number
			return this.m_mouseX;
		},
		
		set: function (__value /* Number */) {
			// read-only
		}
	},

	mouseY: {
		get: function () { // Number
			return this.m_mouseY;
		},
			
		set: function (__value /* Number */) {
			// read-only
		}
	},

	stageX: {
		get: function () { // Number
			return this.m_stageX;
		},
		
		set: function (__value /* Number */) {
			// read-only
		}
	},

	stageY: {
		get: function () { // Number
			return this.m_stageY;
		},
			
		set: function (__value /* Number */) {
			// read-only
		}
	},
	
	numChildEvents: {
		get: function () { // Number
			return this.m_numChildEvents;
		},
			
		set: function (__value /* Number */) {
			// read-only
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