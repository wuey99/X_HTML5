//==========================================================================================
(function() { var c$ = {__initializing__: false};
//==========================================================================================
var n$ = g$.namespace ("X.XMap");
	
g$.import (
		function () {
			g$.import (c$, "X.Collections.*");
			g$.import (c$, "X.Geom.*");
			g$.import (c$, "X.MVC.*");
			g$.import (c$, "X.Utils.*");
			g$.import (c$, "X.XML.*");
		}
	);

//==========================================================================================
	g$.class (c$, n$, {

//==========================================================================================
	name: "XMapLayerModel", extend: c$.XModelBase, borrows: [],
//==========================================================================================

//==========================================================================================
	properties: {
//==========================================================================================
		m_XMap: null,							// XMapModel;
	
		m_layer: 0,								// Number;
	
		m_XSubmaps: [],							// Array;
	
		m_submapRows: 0,						// Number;
		m_submapCols: 0,						// Number;
		m_submapWidth: 0,						// Number;
		m_submapHeight: 0,						// Number;
	
		m_currID: 0,							// Number;

		m_items: null,							// XDict;

		m_classNames: null,						// XClassNameToIndex;
	
		m_viewPort: null,						// XRect;
	
		m_visible: false,						// Boolean;
		m_name: "",								// String;
		m_grid: false,							// Boolean

//==========================================================================================
$: function () {} }, // end properties

//==========================================================================================
	construct:
//==========================================================================================
		function () {
			if (c$.__initializing__) return;
		
			c$.XModelBase.call (this);
		},

//==========================================================================================
	methods: {
//==========================================================================================

//------------------------------------------------------------------------------------------
		// __layer:Number,
		// __submapCols:Number, __submapRows:Number,
		// __submapWidth:Number, __submapHeight:Number
		setup: function (
			__layer, /* Number */
			__submapCols, /* Number */ __submapRows, /* Number */
			__submapWidth, /* Number */ __submapHeight /* Number */
			) { // void
			
			var __row; /* Number */
			var __col; /* Number */

			this.m_submapRows = __submapRows;
			this.m_submapCols = __submapCols;
			this.m_submapWidth = __submapWidth;
			this.m_submapHeight = __submapHeight;

			this.m_currID = 0;
			this.m_items = new c$.XDict ();
			this.m_layer = __layer;
			this.m_XSubmaps = new Array (__submapRows);
			this.m_visible = true;
			this.m_name = "layer" + __layer;
			this.m_grid = false;
			
			for (__row=0; __row<__submapRows; __row++) {
				this.m_XSubmaps[__row] = new Array (__submapCols);

				for (__col=0; __col<__submapCols; __col++) {
					this.m_XSubmaps[__row][__col] = new c$.XSubmapModel (this, __col, __row, this.m_submapWidth, this.m_submapHeight);
				}
			}
			
			this.m_classNames = new c$.XClassNameToIndex ();
			
			this.m_viewPort = new XRect ();
		},
		
//------------------------------------------------------------------------------------------
		cleanup: function () { // void
		},
	
//------------------------------------------------------------------------------------------
		// __XMap:XMapModel
		setParent: function (__XMap /* XMapModel */) { // void
			this.m_XMap = __XMap;
		},
		
//------------------------------------------------------------------------------------------
		// __viewPort:XRect
		setViewPort: function (__viewPort /* XRect */) { // void
			this.m_viewPort = __viewPort;
		},
		
//------------------------------------------------------------------------------------------
		getSubmapRows: function () { // Number {
			return this.m_submapRows;
		},
		
//------------------------------------------------------------------------------------------
		getSubmapCols: function () { // Number {
			return this.m_submapCols;
		},
		
//------------------------------------------------------------------------------------------
		getSubmapWidth: function () { // Number
			return this.m_submapWidth;
		},
	
//------------------------------------------------------------------------------------------
		getSubmapHeight: function () { // Number
			return this.m_submapHeight;
		},
	
//------------------------------------------------------------------------------------------
		// __item:XMapItemModel
		addItem: function (__item /* XMapItemModel */) { // XMapItemModel
			var __c1, /* int */ __r1, /* int */ __c2, /* int */ __r2; /* int */
			
			var __id /* Number */ = __item.getID ();
			
			if (__id == -1) {
// obtain unique ID for this item			
				__id = this.generateID ();
				
				__item.setID (__id);
			}
			
			var r /* XRect */ = __item.boundingRect.cloneX ();
			r.offset (__item.x, __item.y);
			
// determine submaps that the item straddles
			__c1 = r.left/this.m_submapWidth;
			__r1 = r.top/this.m_submapHeight;
			
			__c2 = r.right/this.m_submapWidth;
			__r2 = r.bottom/this.m_submapHeight;

			g$.trace (": -----------------------: ");
			g$.trace (": XXMapLayerModel: addItem: ", __id);
			g$.trace (": ", r.left, r.top, r.right, r.bottom);
			g$.trace (": ", __c1, __r1, __c2, __r2);
// ul
			this.m_XSubmaps[__r1][__c1].addItem (__item);
// ur
			this.m_XSubmaps[__r1][__c2].addItem (__item);
// ll
			this.m_XSubmaps[__r2][__c1].addItem (__item);
// lr
			this.m_XSubmaps[__r2][__c2].addItem (__item);

			this.m_items.put (__item, __item.id);
			
			return __item;
		},

//------------------------------------------------------------------------------------------
		// __item:XMapItemModel
		removeItem: function (__item /* XMapItemModel */) { // void
			if (!this.m_items.exists (__item)) {
				return;
			}
			
			var __c1, /* int */ __r1, /* int */ __c2, /* int */ __r2; /* int */
		
			var r /* XRect */ = __item.boundingRect.cloneX ();
			r.offset (__item.x, __item.y);
			
// determine submaps that the item straddles
			__c1 = r.left/this.m_submapWidth;
			__r1 = r.top/this.m_submapHeight;
			
			__c2 = r.right/this.m_submapWidth;
			__r2 = r.bottom/this.m_submapHeight;

// ul
			this.m_XSubmaps[__r1][__c1].removeItem (__item);
// ur
			this.m_XSubmaps[__r1][__c2].removeItem (__item);
// ll
			this.m_XSubmaps[__r2][__c1].removeItem (__item);
// lr
			this.m_XSubmaps[__r2][__c2].removeItem (__item);
				
			this.m_items.remove (__item);
		},
		
//------------------------------------------------------------------------------------------
		// __x1:Number, __y1:Number,
		//__x2:Number, __y2:Number
		getSubmapsAt: function (
				__x1, /* Number */ __y1, /* Number */
				__x2, /* Number */ __y2 /* Number */
				) { // Array
					
			var __c1, /* int */ __r1, /* int */ __c2, /* int */ __r2; /* int */
	
// determine submaps that the rect straddles
			__c1 = __x1/this.m_submapWidth;
			__r1 = __y1/this.m_submapHeight;
			
			__c2 = __x2/this.m_submapWidth;
			__r2 = __y2/this.m_submapHeight;

			var __row, /* int */ __col; /* int */
						
			var __submaps /* Array */ = new Array ();
			
			__c1 = Math.max (__c1, 0);
			__c2 = Math.min (__c2, this.m_submapCols-1);
			__r1 = Math.max (__r1, 0);
			__r2 = Math.min (__r2, this.m_submapRows-1);
									
			for (__row = __r1; __row <= __r2; __row++) {
				for (__col = __c1; __col <= __c2; __col++) {
					__submaps.push ( this.m_XSubmaps[__row][__col] );
				}
			}
												
			return __submaps;
		},
		
//------------------------------------------------------------------------------------------
		// __x1:Number, __y1:Number,
		// __x2:Number, __y2:Number
		getItemsAt: function (
				__x1, /* Number */ __y1, /* Number */
				__x2, /* Number */ __y2 /* Number */
				) { // Array
			
			var submaps /* Array */ = this.getSubmapsAt (__x1, __y1, __x2, __y2);
			
			var i; /* Number */
			var src_items; /* XDict */
			var dst_items /* Array */ = new Array ();
			var x; // *
			var item; /* XMapItemModel */
			
//			trace (": ---------------------: ");	
//			trace (": getItemsAt: ");
//			trace (": ---------------------: ");
						
			for (i=0; i<submaps.length; i++) {
				src_items = submaps[i].items ();
							
				src_items.forEach (
					function (x) { // void
						item = x; /* as XMapItemModel */
						
						var b /* XRect */ = item.boundingRect.cloneX ();
						b.offset (item.x, item.y);
						
						if (
							!(__x2 < b.left || __x1 > b.right ||
							  __y2 < b.top || __y1 > b.bottom)
							) {
								
							if (!(item in dst_items)) {
	//							trace (": item: ", item);
								
								dst_items.push (item);
							}
						}
					}
				);
			}
			
			return dst_items;		
		},
		
//------------------------------------------------------------------------------------------
		// __x1:Number, __y1:Number,
		// __x2:Number, __y2:Number
		getItemsAtCX: function (
				__x1, /* Number */ __y1, /* Number */
				__x2, /* Number */ __y2 /* Number */
				) { // Array
			
			var submaps /* Array */ = this.getSubmapsAt (__x1, __y1, __x2, __y2);
							
			var i; /* Number */
			var src_items; /* XDict */
			var dst_items /* Array */ = new Array ();
			var x; // *
			var item; /* XMapItemModel */

			trace ([": ---------------------: "]);	
			trace ([": getItemsAt: submaps: ", submaps.length]);
			trace ([": ---------------------: "]);
				
			for (i=0; i<submaps.length; i++) {
				src_items = submaps[i].items ();
								
				src_items.forEach (
					function (x) { // void
						item = x; /* as XMapItemModel */
				
						var cx /* XRect */ = item.collisionRect.cloneX ();
						cx.offset (item.x, item.y);
						
						if (
							!(__x2 < cx.left || __x1 > cx.right ||
							  __y2 < cx.top || __y1 > cx.bottom)
							) {
								
							if (dst_items.indexOf (item) == -1) {
								dst_items.push (item);
							}
						}
					}
				);
			}
			
			return dst_items;		
		},
		
//------------------------------------------------------------------------------------------
		// c1:Number, r1:Number,
		// c2:Number, r2:Number
		getCXTiles: function (
			c1, /* Number */ r1, /* Number */
			c2, /* Number */ r2 /* Number */
		) { // Array
			
// tile array to return
			var tiles; /* Array */

// col, row divisor
			var row32 /* int */ = this.m_submapHeight/XSubmapModel.CX_TILE_HEIGHT;
			var col32 /* int */ = this.m_submapWidth/XSubmapModel.CX_TILE_WIDTH;

// col, row mask for the submap
			var rowMask /* int */ = row32-1;
			var colMask /* int */ = col32-1;
			
// total columns wide, rows high
			var cols /* int */ = c2-c1+1;
			var rows /* int */ = r2-r1+1;

			tiles = new Array (cols * rows);
			
			for (var row /* int*/ = r1; row <= r2; row++) {
				var submapRow /* int */ = row/row32;
				
				for (var col /* int */ = c1; col <= c2; col++) {
					var dstCol /* int */ = col-c1, dstRow /* int */ = row-r1;
					
					var submapCol /* int */ = Math.floor (col/col32);
				
					tiles[dstRow * cols + dstCol] =
						this.m_XSubmaps[submapRow][submapCol].getCXTile (col & colMask, row & rowMask);
				}
			}
			
			return tiles;
		},	

//------------------------------------------------------------------------------------------
		// tiles:Array,
		// c1:Number, r1:Number,
		// c2:Number, r2:Number
		setCXTiles: function (
			tiles, /*  Array */
			c1, /* Number */ r1, /* Number */
			c2, /* Number */ r2 /* Number */
		) { // void {
// col, row divisor
			var row32 /* int */ = this.m_submapHeight/c$.XSubmapModel.CX_TILE_HEIGHT;
			var col32 /* int */ = this.m_submapWidth/c$.XSubmapModel.CX_TILE_WIDTH;

// col, row mask for the submap
			var rowMask /* int */ = row32-1;
			var colMask /* int */ = col32-1;
			
// total columns wide, rows high
			var cols /* int */ = c2-c1+1;
			var rows /* int */ = r2-r1+1;
	
			for (var row /* int */ =r1; row <= r2; row++) {
				var submapRow /* int */ = Math.floor (row/row32);
				
				for (var col /* int */ =c1; col <= c2; col++) {
					var dstCol /* int */ = col-c1, dstRow /* int */ = row-r1;
					
					var submapCol /* int */ = Math.floor (col/col32);
								
					this.m_XSubmaps[submapRow][submapCol].setCXTile (
						tiles[dstRow * cols + dstCol],
						col & colMask, row & rowMask
					);
				}
			}
		},

//------------------------------------------------------------------------------------------
		// tiles:Array,
		// c1:Number, r1:Number,
		// c2:Number, r2:Number
		eraseWithCXTiles: function (
			tiles, /* Array */
			c1, /* Number */ r1, /* Number */
			c2, /* Number */ r2 /* Number */
		) { // void {
// col, row divisor
			var row32 /* int */ = Math.floor (this.m_submapHeight/c$.XSubmapModel.CX_TILE_HEIGHT);
			var col32 /* int */ = Math.floor (this.m_submapWidth/c$.XSubmapModel.CX_TILE_WIDTH);

// col, row mask for the submap
			var rowMask /* int */ = row32-1;
			var colMask /* int */ = col32-1;
			
// total columns wide, rows high
			var cols /* int */ = c2-c1+1;
			var rows /* int */ = r2-r1+1;
	
			for (var row /* int */=r1; row <= r2; row++) {
				var submapRow /* int */ = row/row32;
				
				for (var col /* int */=c1; col <= c2; col++) {
					var dstCol /* int */ = col-c1, dstRow /* int */ = row-r1;
					
					var submapCol /* int */ = Math.floor (col/col32);
								
					this.m_XSubmaps[submapRow][submapCol].setCXTile (
						XSubmapModel.CX_EMPTY,
						col & colMask, row & rowMask
					);
				}
			}
		},
		
//------------------------------------------------------------------------------------------
		// __item:XMapItemModel
		updateItem: function (__item /* XMapItemModel */) { // void
		},
		
//------------------------------------------------------------------------------------------
		generateID: function () { // Number
			this.m_currID += 1;
			
			return this.m_currID;
		},
		
//------------------------------------------------------------------------------------------
		items: function () { // XDict
			return this.m_items;
		},
			
//------------------------------------------------------------------------------------------
		submaps: function  () { // Array {
			return this.m_XSubmaps;
		},
		
//------------------------------------------------------------------------------------------
		// __item:XMapItemModel
		getItemId: function (__item /* XMapItemModel */) { // Number
			return this.m_items.get (__item);
		},		

//------------------------------------------------------------------------------------------
		// __index:int
		getClassNameFromIndex: function (__index /* int */) { // String
			return this.m_classNames.getClassNameFromIndex (__index);
		},
		
//------------------------------------------------------------------------------------------
		// __className:String
		getIndexFromClassName: function (__className /* String */) { // int
			return this.m_classNames.getIndexFromClassName (__className);
		},

//------------------------------------------------------------------------------------------
		// __index:int
		removeIndexFromClassNames: function (__index /* int */) { // void
			this.m_classNames.removeIndexFromClassNames (__index);
		},
	
//------------------------------------------------------------------------------------------
		getAllClassNames: function () { // Array
			return this.m_classNames.getAllClassNames ();
		},
	
//------------------------------------------------------------------------------------------
		getClassNames: function () { // XClassNameToIndex {
			return this.m_classNames;
		},
		
//------------------------------------------------------------------------------------------
		//__xml:XSimpleXMLNode
		serialize: function (__xml /* XSimpleXMLNode */) { // XSimpleXMLNode
			var __attribs /* Array */ = [
				"vx",			this.viewPort.x,
				"vy",			this.viewPort.y,
				"vw",			this.viewPort.width,
				"vh",			this.viewPort.height,
				"layer",		this.m_layer,
				"submapRows",	this.m_submapRows,
				"submapCols",	this.m_submapCols,
				"submapWidth",	this.m_submapWidth,
				"submapHeight",	this.m_submapHeight,
				"currID",		this.m_currID,
				"visible", 		this.m_visible,
				"name",			this.m_name,
				"grid", 		this.m_grid,
			];
			
			__xml = __xml.addChildWithParams ("XLayer", "", __attribs);
			
			__xml.addChildWithXMLNode (this.m_classNames.serialize ());
			__xml.addChildWithXMLNode (this.serializeItems ());
			__xml.addChildWithXMLNode (this.serializeSubmaps ());
				
			return __xml;
		},
		

//------------------------------------------------------------------------------------------
		serializeItems: function () { // XSimpleXMLNode
			var xml /* XSimpleXMLNode */ = new XSimpleXMLNode ();
					
			xml.setupWithParams ("items", "", []);
				
			return xml;
		},
		
//------------------------------------------------------------------------------------------
		serializeSubmaps: function () { // XSimpleXMLNode
			var xml /* XSimpleXMLNode */ = new XSimpleXMLNode ();
			
			xml.setupWithParams ("XSubmaps", "", []);
			
			var __row, /* Number */ __col; /* Number */
			var __x1, /* Number */ __y1, /* Number */ __x2, /* Number */ __y2; /* Number */
			
			this.cullUnneededItems ();
			
			for (__row=0; __row<this.m_submapRows; __row++) {
				__y1 = __row * this.m_submapHeight;
				__y2 = __y1 + this.m_submapHeight-1;
				
				for (__col=0; __col<this.m_submapCols; __col++) {
					__x1 = __col * this.m_submapWidth;
					__x2 = __x1 + this.m_submapWidth-1;
					
					var submaps /* Array */ = this.getSubmapsAt (__x1, __y1, __x2, __y2);
					
					if (submaps.length == 1) {
						var submap /* XSubmapModel */ = submaps[0]; /* as XSubmapModel */
						
						if (this.submap (submap)) {
							xml.addChildWithXMLNode (submap.serializeRowCol (__row, __col));
						}
					}
				}
			}
			
			return xml;
		},
	
//------------------------------------------------------------------------------------------
		// submap:XSubmapMode
		submapIsNotEmpty: function (submap /* XSubmapModel */) { //Boolean {
			var count /* Number */ = 0;
					
			submap.items ().forEach (
				function (x) { // void {	
					count++;
				}
			);
			
			return count > 0 || submap.hasCXTiles ();
		},
		
//------------------------------------------------------------------------------------------
		// __xml:XSimpleXMLNode
		deserialize: function (__xml /* XSimpleXMLNode */) { // void
			g$.trace (": [XMapLayer]: deserialize: ");
			
			this.m_viewPort = new c$.XRect (
				__xml.getAttribute ("vx"),
				__xml.getAttribute ("vy"),
				__xml.getAttribute ("vw"),
				__xml.getAttribute ("vh")
			);
			
			this.m_layer = __xml.getAttribute ("layer");
			this.m_submapRows = __xml.getAttribute ("submapRows");
			this.m_submapCols = __xml.getAttribute ("submapCols");
			this.m_submapWidth = __xml.getAttribute ("submapWidth");
			this.m_submapHeight = __xml.getAttribute ("submapHeight");
			this.m_currID = __xml.getAttribute ("currID");
			if (__xml.hasAttribute ("visible")) {
				this.m_visible = __xml.getAttribute ("visible");
			}
			else
			{
				this.m_visible = true;
			}
			if (__xml.hasAttribute ("name")) {
				this.m_name = __xml.getAttribute ("name");
			}
			else
			{
				this.m_name = "";
			}
			if (__xml.hasAttribute ("grid")) {
				this.m_grid = __xml.getAttribute ("grid");
			}
			else
			{
				this.m_grid = false;
			}	
			this.m_classNames = new c$.XClassNameToIndex ();
			
			this.m_items = new c$.XDict ();
			this.m_XSubmaps = new Array (this.m_submapRows);
			
			this.m_classNames.deserialize (__xml);
			this.deserializeItems (__xml);
			this.deserializeSubmaps (__xml);
		},
		
//------------------------------------------------------------------------------------------
		// __xml:XSimpleXMLNode
		deserializeItems: function (__xml /* XSimpleXMLNode */) { // void
		},
		
//------------------------------------------------------------------------------------------
		deserializeSubmaps: function (__xml /* XSimpleXMLNode */) { // void {
			g$.trace (": [XMapLayer]: deserializeSubmaps: ");
			
//------------------------------------------------------------------------------------------	
			var __row; /* Number */
			var __col; /* Number */
			
			for (__row=0; __row<this.m_submapRows; __row++) {
				this.m_XSubmaps[__row] = new Array (this.m_submapCols);

				for (__col=0; __col<this.m_submapCols; __col++) {
					this.m_XSubmaps[__row][__col] = new c$.XSubmapModel (this, __col, __row, this.m_submapWidth, this.m_submapHeight);
				}
			}
		
//------------------------------------------------------------------------------------------	
			var __xmlList; /* Array */
			var i; /* Number */
			
			__xmlList = __xml.child ("XSubmaps")[0].child ("XSubmap");
				
			for (i=0; i<__xmlList.length; i++) {
				var __submapXML /* XSimpleXMLNode */ = __xmlList[i];
				
				__row = __submapXML.getAttribute ("row");
				__col = __submapXML.getAttribute ("col");
					
				this.m_XSubmaps[__row][__col].deserializeRowCol (__submapXML);
			}
			

//------------------------------------------------------------------------------------------	
			for (__row=0; __row<this.m_submapRows; __row++) {
				for (__col=0; __col<this.m_submapCols; __col++) {
					this.m_XSubmaps[__row][__col].items ().forEach (
						function (__item) { // void {
							this.m_items.put (__item, __item.id);
						}
					);
				}
			}
			
//------------------------------------------------------------------------------------------
			this.cullUnneededItems ();
		},
		
//------------------------------------------------------------------------------------------
		cullUnneededItems: function () { // void {
			var __row; /* Number */
			var __col; /* Number */
			var __submapRect; /* XRect */ 
										
			for (__row=0; __row<this.m_submapRows; __row++) {
				for (__col=0; __col<this.m_submapCols; __col++) {
					__submapRect = new c$.XRect (
						__col * this.m_submapWidth, __row * this.m_submapHeight,
						this.m_submapWidth, this.m_submapHeight
					);
							
					this.m_XSubmaps[__row][__col].items ().forEach (
						function (__item) { // void {			
							var __itemRect /* XRect */ = __item.boundingRect.cloneX ();
							__itemRect.offset (__item.x, __item.y);
							
							g$.trace (": submapRect, itemRect: ", __item.id, __submapRect, __itemRect, __submapRect.intersects (__itemRect));
							
							if (!__submapRect.intersects (__itemRect)) {
								this.m_XSubmaps[__row][__col].removeItem (__item);
							}
						}
					);
				}
			}		
		},
		
//==========================================================================================
$: function () {} }, // end methods

//==========================================================================================
accessors: {
//==========================================================================================
	
//------------------------------------------------------------------------------------------
	viewPort: {
		get: function () { // XRect
			return this.m_viewPort;
		},
		
		set: function (__value) { // void {
			this.m_viewPort = __value;
		}
	},

//------------------------------------------------------------------------------------------
	visible: {
		get: function () { // Boolean {
			return this.m_visible;
		},
		
		set: function (__value) {
			this.m_visible = __value;
		}
	},

//------------------------------------------------------------------------------------------
	name: {
		get: function () { // String {
			return this.m_name;
		},
	
		set: function (__value /* String */) { // void {
			this.m_name = __value;
		}
	},

//------------------------------------------------------------------------------------------
	grid: {
		get: function () { // Boolean {
			return this.m_grid;
		},
	
		set: function (__value /* Boolean */) { // void {
			this.m_grid = __value;
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