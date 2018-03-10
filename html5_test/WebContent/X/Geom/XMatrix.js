//==========================================================================================
(function() { var c$ = {__initializing__: false};
//==========================================================================================
var n$ = g$.namespace ("X.Geom");
	
//==========================================================================================
	g$.class (c$, n$, {

//==========================================================================================
	name: "XMatrix", extend: Object, borrows: [],
//==========================================================================================

//==========================================================================================
	properties: {
//==========================================================================================
			m_a: 0,							// Number;
			m_b: 0,							// Number;
			m_c: 0,							// Number;
			m_d: 0,							// Number;
			m_tx: 0,						// Number;
			m_ty: 0,						// Number;
	
//==========================================================================================
$: function () {} }, // end properties

//==========================================================================================
	construct:
//==========================================================================================
		// __a:Number = 1,
		// __b:Number = 0,
		// __c:Number = 0,
		// __d:Number = 1,
		// __tx:Number = 0,
		// __ty:Number = 0
		function (
				__a, /* Number = 1 */
				__b, /* Number = 0 */
				__c, /* Number = 0 */
				__d, /* Number = 1 */
				__tx, /* Number = 0 */
				__ty /* Number = 0 */
				) {
				
				if (c$.__initializing__) return;

				__a = __a ? __a : 1;
				__b = __b ? __b : 0;
				__c = __c ? __c : 0;
				__d = __d ? __d : 1;
				__tx = __tx ? __tx : 0;
				__ty = __ty ? __ty : 0;
				
//				Object.call (this);
				
				this.m_a = __a;
				this.m_b = __b;
				this.m_c = __c;
				this.m_d = __d;
				this.m_tx = __tx;
				this.m_ty = __ty;
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
		clone: function () { // XMatrix
			return new c$.XMatrix (this.m_a, this.m_b, this.m_c, this.m_d, this.m_tx, this.m_ty);
		},	
		
//------------------------------------------------------------------------------------------
		identity: function () { // void
			this.m_a = 1;
			this.m_b = 0;
			this.m_c = 0;
			this.m_d = 1;
			this.m_tx = 0;
			this.m_ty = 0;
		},

//------------------------------------------------------------------------------------------
// __m:XMatrix
		concat: function (__m /* XMatrix */) { // XMatrix
			var __a /* Number */ = this.m_a;
			var __b /* Number */ = this.m_b;
			var __c /* Number */ = this.m_c;
			var __d /* Number */ = this.m_d;
			var __tx /* Number */ = this.m_tx;
			var __ty /* Number */ = this.m_ty;
			
 			this.m_a = __m.a * __a + __m.c * __b;
			this.m_b = __m.b * __a + __m.d * __b;
			this.m_c = __m.a * __c + __m.c * __d;
			this.m_d = __m.b * __c + __m.d * __d;
                        
			this.m_tx = __m.a * __tx + __m.c * __ty + __m.tx;
			this.m_ty = __m.b * __tx + __m.d * __ty + __m.ty;
                        
			return this;
		},
		
//------------------------------------------------------------------------------------------
// __m:XMatrix
		prepend: function (__m /* XMatrix */) { // XMatrix
			var __a /* Number */ = this.m_a;
			var __b /* Number */ = this.m_b;
			var __c /* Number */ = this.m_c;
			var __d /* Number */ = this.m_d;
			var __tx /* Number */ = this.m_tx;
			var __ty /* Number */ = this.m_ty;
			
 			this.m_a = __m.a * __a + __m.c * __b;
			this.m_b = __m.b * __a + __m.d * __b;
			this.m_c = __m.a * __c + __m.c * __d;
			this.m_d = __m.b * __c + __m.d * __d;
                        
			this.m_tx = __m.a * __tx + __m.c * __ty + __m.tx;
			this.m_ty = __m.b * __tx + __m.d * __ty + __m.ty;
                        
			return this;
		},

//------------------------------------------------------------------------------------------
		// __m:XMatrix
		append: function (__m /* XMatrix */) { // XMatrix
			var __a /* Number */ = this.m_a;
			var __b /* Number */ = this.m_b;
			var __c /* Number */ = this.m_c;
			var __d /* Number */ = this.m_d;
			var __tx /* Number */ = this.m_tx;
			var __ty /* Number */ = this.m_ty;
			
 			this.m_a = __m.a * __a + __m.b * __c;
			this.m_b = __m.a * __b + __m.b * __d;
			this.m_c = __m.c * __a + __m.d * __c;
			this.m_d = __m.c * __b + __m.d * __d;
                        
			this.m_tx = __m.tx * __a + __m.ty * __c + this.m_tx;
			this.m_ty = __m.tx * __b + __m.ty * __d + this.m_ty;
                        
			return this;
		},
		
//------------------------------------------------------------------------------------------
		invert: function () { // void
			var __a /* Number */ = this.m_a;
			var __b /* Number */ = this.m_b;
			var __c /* Number */ = this.m_c;
			var __d /* Number */ = this.m_d;
			var __tx /* Number */ = this.m_tx;
			var __ty /* Number */ = this.m_ty
			var __det /* Number */ = 1/this.determinant;
			
			this.m_a = __d * __det;
			this.m_b = -__b * __det;
			this.m_c = __c * __det;
			this.m_d = __a * __det;

			this.m_tx = (__c * __ty - __tx * __d ) * __det;
			this.m_ty = (__tx * __b - __a * __ty ) * __det;
		},
		
//------------------------------------------------------------------------------------------
		// __angle:Number
		rotate: function (__angle /* Number */) { // XMatrix
			return this.concat (c$.XMatrix.createRotation (__angle));
		},
		
//------------------------------------------------------------------------------------------
		// __sx:Number, __sy:Number
		scale: function (__sx, /* Number */ __sy /* Number */) { // XMatrix
			return this.concat (c$.XMatrix.createScaling (__sx, __sy));
		},
		
//------------------------------------------------------------------------------------------
		// __dx:Number, __dy:Number
		translate: function (__dx, /* Number */ __dy /* Number */) { // XMatrix
			return this.concat (c$.XMatrix.createTranslation (__dx, __dy));
		},

//------------------------------------------------------------------------------------------
		toString: function () { // String
			return "(a=" + this.m_a + ", b=" + this.m_b + ", c=" + this.m_c + ", d=" + this.m_d + ", tx=" + this.m_tx + ", ty=" + this.m_ty + ")";
		},
		
//==========================================================================================
$: function () {} }, // end methods

//==========================================================================================
accessors: {
//==========================================================================================
	
//------------------------------------------------------------------------------------------
	determinant: {
		get: function () { // Number
			return this.m_a * this.m_d - this.m_b * this.m_c;
		},
		
		set: function (__value) {
		}
	},

//------------------------------------------------------------------------------------------
	a: {
		get: function () { // Number
			return this.m_a;
		},
		
		set: function (__value) {
			this.m_a = __value;
		}
	},
	
//------------------------------------------------------------------------------------------
	b: {
		get: function () { // Number
			return this.m_b;
		},
		
		set: function (__value) {
			this.m_b = __value;
		}
	},

//------------------------------------------------------------------------------------------
	c: {
		get: function () { // Number
			return this.m_c;
		},
		
		set: function (__value) {
			this.m_c = __value;
		}
	},

//------------------------------------------------------------------------------------------
	d: {
		get: function () { // Number
			return this.m_d;
		},
		
		set: function (__value) {
			this.m_d = __value;
		}
	},

//------------------------------------------------------------------------------------------
	tx: {
		get: function () { // Number
			return this.m_tx;
		},
		
		set: function (__value) {
			this.m_tx = __value;
		}
	},
	
//------------------------------------------------------------------------------------------
	ty: {
		get: function () { // Number
			return this.m_ty;
		},
		
		set: function (__value) {
			this.m_ty = __value;
		}
	},
	
//==========================================================================================
$: {} }, // end accessors

//==========================================================================================
statics: {
//==========================================================================================
	
//------------------------------------------------------------------------------------------
	// __sx:Number, __sy:Number
	createScaling: function (__sx, /* Number */ __sy /* Number */) { // XMatrix
		return new c$.XMatrix (__sx, 0, 0, __sy, 0, 0);
	},
	
//------------------------------------------------------------------------------------------
	// __tx:Number, __ty:Number
	createTranslation: function (__tx, /* Number */ __ty /* Number */) { // XMatrix
		return new c$.XMatrix (1, 0, 0, 1, __tx, __ty);
	},
	
//------------------------------------------------------------------------------------------
	// __angle:Number
	createRotation: function (__angle /* Number */) { // XMatrix
		var __radians /* Number */ = __angle*Math.PI/180;
		
		var __sin /* Number */ = Math.sin (__radians);
		var __cos /* Number */ = Math.cos (__radians);
		
		return new c$.XMatrix (__cos, __sin, -__sin, __cos, 0, 0);
	},
	
//==========================================================================================
$: function () {} }, // end statics

//==========================================================================================
end: []
//==========================================================================================
	});
			
//==========================================================================================
}());