//==========================================================================================
(function() { var c$ = {__initializing__: false};
//==========================================================================================
var n$ = g$.namespace ("X.XMap");
	
g$.import (
		function () {
			g$.import (c$, "X.Collections.*");
			g$.import (c$, "X.Geom.*");
			g$.import (c$, "X.MVC.*");
			g$.import (c$, "X.XML.*");
		}
	);

//==========================================================================================
	g$.class (c$, n$, {

//==========================================================================================
	name: "XSubmapModel", extend: c$.XModelBase, borrows: [],
//==========================================================================================

//==========================================================================================
	properties: {
//==========================================================================================
		m_XMapLayer: null,						// XMapLayerModel;
	
		m_submapWidth: 0,						// Number;
		m_cols: 0,								// Number;
	
		m_submapHeight: 0,						// int;
		m_rows: 0,								// int;
	
		m_col: 0,								// int;
		m_row: 0,								// int;
	
		m_cmap: [],								// Array;
		m_inuse: 0,								// Number;
	
		m_boundingRect: null,					// XRect;
	
		m_items: null,							// XDict;
	
//==========================================================================================
$: function () {} }, // end properties

//==========================================================================================
	construct:
//==========================================================================================
		// __XMapLayer:XMapLayerModel,
		// __col:Number, __row:Number,
		// __width:Number, __height:Number
		function (
			__XMapLayer, /* XMapLayerModel */
			__col, /* Number */ __row, /* Number */
			__width, /* Number */ __height /* Number */
			) {
		
			if (c$.__initializing__) return;
		
			c$.XModelBase.call (this);
			
			this.m_XMapLayer = __XMapLayer;
			
			this.m_submapWidth = __width;
			this.m_submapHeight = __height;
		
			this.m_col = __col;
			this.m_row = __row;
		
			this.m_cols = this.m_submapWidth/c$.CX_TILE_WIDTH;
			this.m_rows = this.m_submapHeight/c$.CX_TILE_HEIGHT;
	
			this.m_boundingRect = new c$.XRect (0, 0, this.m_submapWidth, this.m_submapHeight);
			
			this.m_cmap = new Array (this.m_cols * this.m_rows);
			
			this.m_inuse = 0;
			
			for (var i /* int */ = 0; i< this.m_cmap.length; i++) {
				this.m_cmap[i] = c$.CX_EMPTY;
			}
			
			this.m_items = new c$.XDict ();
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
		// __type:Number, __col:Number, __row:Number
		setCXTile: function (__type, /* Number */ __col, /* Number */ __row /* Number */) { // void
		},
		
//------------------------------------------------------------------------------------------
		// __col:Number, __row:Number
		getCXTile: function (__col, /* Number */ __row /* Number */) { // Number
			return this.m_cmap[__row * this.m_cols + __col];
		},
	
//------------------------------------------------------------------------------------------
		hasCXTiles: function () { // Boolean {
			var __row, /* Number */ __col; /* Number */
			
			for (__row = 0; __row < this.m_rows; __row++) {
				for (__col = 0; __col < this.m_cols; __col++) {
					if (this.m_cmap[__row * m_cols + __col] != CX_EMPTY) {
						return true;
					}
				}
			}
			
			return false;
		},
		
//------------------------------------------------------------------------------------------
		// __item:XMapItemModel
		addItem: function (
			__item /* XMapItemModel */
			) { XMapItemModel
				
			g$.trace (": XSubmapModel: additem: ",  this.m_col, this.m_row, __item.getID (), this.m_items.exists (__item));
					
			if (!this.m_items.exists (__item)) {
				this.m_items.put (__item, __item.id);
			}
					
			return __item;
		},
		
//------------------------------------------------------------------------------------------
//		__item:XMapItemModel
		removeItem: function (
			__item /* XMapItemModel */
			) { // void
			
			g$.trace (": XSubmapModel: removeItem: ",  this.m_col, this.m_row, __item.getID (), this.m_items.exists (__item));
			
			if (this.m_items.exists (__item)) {
				this.m_items.remove (__item);
			}
		},
		
//------------------------------------------------------------------------------------------
		items: function () { // XDict
			return this.m_items;
		},

//------------------------------------------------------------------------------------------
		// __row:Number, __col:Number
		serializeRowCol: function (__row, /* Number */ __col /* Number */) { // XSimpleXMLNode
			var xml /* XSimpleXMLNode */ = new c$.XSimpleXMLNode ();
			
			var __attribs /* Array */ = [
				"row",	__row,
				"col",	__col
			];
			
			xml.setupWithParams ("XSubmap", "", __attribs);

			if (this.hasCXTiles ()) {
				xml.addChildWithXMLNode (this.serializeCXTiles ());
			}
			
			var item; /* XMapItemModel */
	
			items ().forEach (
				function (x){ // void 
					item = x; /* as XMapItemModel */
					
					xml.addChildWithXMLNode (item.serialize ());
				}
			);
			
			return xml;
		},
		
//------------------------------------------------------------------------------------------
		serializeCXTiles: function () { // XSimpleXMLNode {
			var __xmlCX /* XSimpleXMLNode */ = new c$.XSimpleXMLNode ();			
			__xmlCX.setupWithParams ("CX", "", []);
			
			var __row, /* Number */ __col; /* Number */
				
			for (__row = 0; __row < this.m_rows; __row++) {
				var __xmlRow /* XSimpleXMLNode */ = new c$.XSimpleXMLNode ();
		
				var __rowString /* String */ = "";
				
				for (__col = 0; __col < this.m_cols; __col++) {
					__rowString += c$.CXToChar.charAt (this.m_cmap[__row * this.m_cols + __col]);
				}
				
				__xmlRow.setupWithParams ("row", __rowString, []);
				
				__xmlCX.addChildWithXMLNode (__xmlRow);
			}

			return __xmlCX;
		},
		
//------------------------------------------------------------------------------------------
		// _xml:XSimpleXMLNode
		deserializeRowCol: function (__xml /* XSimpleXMLNode */) { // void {
			var __xmlList; /* Array */
			var i; /* Number */

//------------------------------------------------------------------------------------------			
			__xmlList = __xml.child ("CX");
			
			if (__xmlList.length) {
				this.deserializeCXTiles (__xmlList[0]);
			}
			
//------------------------------------------------------------------------------------------
			__xmlList = __xml.child ("XMapItem");
						
			for (i=0; i<__xmlList.length; i++) {
				var __xml /* XSimpleXMLNode */ = __xmlList[i];
				
				g$.trace (": deserializeRowCol: ", this.m_col, this.m_row);
				
				var __item /* XMapItemModel */ = new c$.XMapItemModel ();
		
				var __classNameToIndex /* XClassNameToIndex */ = this.m_XMapLayer.getClassNames ();
				
				var __logicClassIndex /* Number */ = __xml.getAttribute ("logicClassIndex");
				var __imageClassIndex /* Number */ = __xml.getAttribute ("imageClassIndex");
				
				g$.trace (": logicClassName: ", this.m_XMapLayer.getClassNameFromIndex (__logicClassIndex), __classNameToIndex.getClassNameCount (__logicClassIndex));
				g$.trace (": imageClassName: ", this.m_XMapLayer.getClassNameFromIndex (__imageClassIndex),  __classNameToIndex.getClassNameCount (__imageClassIndex));
								
				__item.setup (
					this.m_XMapLayer,
// __logicClassName
					this.m_XMapLayer.getClassNameFromIndex (__logicClassIndex),
// __name, __id
					__xml.getAttribute ("name"), __xml.getAttribute ("id"),
// __imageClassName, __frame
					this.m_XMapLayer.getClassNameFromIndex (__imageClassIndex), __xml.getAttribute ("frame"),
// __x, __y,
					__xml.getAttribute ("x"), __xml.getAttribute ("y"),
// __scale, __rotation, __depth
					__xml.getAttribute ("scale"), __xml.getAttribute ("rotation"), __xml.getAttribute ("depth"),
// __collisionRect,
					new c$.XRect (__xml.getAttribute ("cx"), __xml.getAttribute ("cy"), __xml.getAttribute ("cw"), __xml.getAttribute ("ch")),
// __boundingRect,
					new c$.XRect (__xml.getAttribute ("bx"), __xml.getAttribute ("by"), __xml.getAttribute ("bw"), __xml.getAttribute ("bh")),
// __params
					__xml.child ("params")[0].toXMLString ()
					);
					
					this.addItem (__item);
			}
		},
		
//----------------------------------------------------------------------------------------
		deserializeCXTiles: function (__cx /* XSimpleXMLNode */) { // void {
			var __xmlList /* Array */ = __cx.child ("row");
			var __row, /* Number */ __col; /* Number */
			
			for (__row=0; __row<__xmlList.length; __row++) {
				var __xml /* XSimpleXMLNode */ = __xmlList[__row];
				var __rowString /* String */ = __xml.getText ();
				
				for (__col=0; __col<__rowString.length; __col++) {
					this.m_cmap[__row * m_cols + __col] = c$.CXToChar.indexOf (__rowString.charAt (__col));
				}
			}
		},
		
//==========================================================================================
$: function () {} }, // end methods

//==========================================================================================
accessors: {
//==========================================================================================
	
//------------------------------------------------------------------------------------------
		inuse: {
			get: function () { // Number
				return this.m_inuse;
			},
			
			set: function (__value) {
				this.m_inuse = __value;
			}
		},
	
//------------------------------------------------------------------------------------------
		cols: {
			get: function () { // Number
				return this.m_cols;
			},
			
			set: function (__value) {
				this.m_cols = __value;
			}
		},
		
//------------------------------------------------------------------------------------------
		rows: {
			get: function () { // Number
				return this.m_rows;
			},
			
			set: function (__value) {
				this.m_rows = __value;
			}
		},
		
//------------------------------------------------------------------------------------------
		boundingRect: { // XRect
			get: function () {
				return this.m_boundingREct;
			},
			
			set: function (__value) {
			}
		},
		
//------------------------------------------------------------------------------------------
		x: {
			get: function () { // Number
				return  this.m_col * this.m_submapWidth;
			},
			
			set: function (__value) {
			}
		},
		
//------------------------------------------------------------------------------------------
		y: {
			get: function () { // Number
				return this.m_row * this.m_submapHeight;
			},
			
			set: function (__value) {
			}
		},
		
//------------------------------------------------------------------------------------------
		width: {
			get: function () { // Number
				return this.m_submapWidth;
			},
			
			set: function (__value) {
			}
		},
		
//------------------------------------------------------------------------------------------
		height: {
			get: function () { // Number
				return this.m_submapHeight;
			},
			
			set: function (__value) {
			}
		},
		
//------------------------------------------------------------------------------------------
		cmap: {
			get: function () { // Array
				return this.m_cmap;
			},
			
			set: function (__value) {
			}
		},
		
//==========================================================================================
$: {} }, // end accessors

//==========================================================================================
statics: {
//==========================================================================================
	// empty
		CX_EMPTY: 0,						// Number = 0;
	
//solid solid
		CX_SOLID: 1,						// Number = 1;
	
//soft
		CX_SOFT: 2,							// Number = 2;	
	
//jump thru
		CX_JUMP_THRU: 3,					// Number = 3;
	
//45 degree diagonals
		CX_UL45: 4,							// Number = 4;
		CX_UR45: 5,							// Number = 5;
		CX_LL45: 6,							// Number = 6;
		CX_LR45: 7,							// Number = 7;
	
//22.5 degree diagonals
		CX_UL225A: 8, 						// Number = 8;
		CX_UL225B: 9,						// Number = 9;
		CX_UR225A: 10,						// Number = 10;
		CX_UR225B: 11, 						// Number = 11;
		CX_LL225A: 12,						// Number = 12;
		CX_LL225B: 13,						// Number = 13;
		CX_LR225A: 14,						// Number = 14;
		CX_LR225B: 15,						// Number = 15;

// 67.5 degree diagonals
		CX_UL675A: 16,						// Number = 16;
		CX_UL675B: 17,						// Number = 17;
		CX_UR675A: 18,						// Number = 18;
		CX_UR675B: 19,						// Number = 19;
		CX_LL675A: 20,						// Number = 20;
		CX_LL675B: 21,						// Number = 21;
		CX_LR675A: 22,						// Number = 22;
		CX_LR675B: 23,						// Number = 23;
		
// soft tiles
		CX_SOFTLF: 24,						// Number = 24;
		CX_SOFTRT: 25,						// Number = 25;
		CX_SOFTUP: 26,						// Number = 26;
		CX_SOFTDN: 27,						// Number = 27;
		
		CX_MAX: 28,							// Number = 28;
		
//tile width, height
		CX_TILE_WIDTH: 16,					// Number = 16;
		CX_TILE_HEIGHT:16,					// Number = 16;
	
		CX_TILE_WIDTH_MASK: 15,				// Number = 15;
		CX_TILE_HEIGHT_MASK: 15,			// Number = 15;
	
		CX_TILE_WIDTH_UNMASK: 0xfffffff0,	// Number = 0xfffffff0;
		CX_TILE_HEIGHT_UNMASK: 0xfffffff0,	// Number = 0xfffffff0;
	
		CXToChar: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",	// String

//==========================================================================================
$: function () {} }, // end statics

//==========================================================================================
end: []
//==========================================================================================
	});
			
//==========================================================================================
}());