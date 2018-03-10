//==========================================================================================
(function() { var c$ = {__initializing__: false};
//==========================================================================================
var n$ = g$.namespace ("X.XMap");
	
g$.import (
		function () {
			g$.import (c$, "X.Geom.*");
			g$.import (c$, "X.MVC.*");
			g$.import (c$, "X.XML.*");
		}
	);

//------------------------------------------------------------------------------------------
//XMapModel:
//consists of 1-n layers (XMapLayerModel).  Each layer is sub-divided
//into a grid of submaps (XSubmapModel) submapCols wide and submapRows high.
//each submap is submapWidth pixels wide and submapHeight pixels high.
//------------------------------------------------------------------------------------------

//==========================================================================================
	g$.class (c$, n$, {

//==========================================================================================
	name: "XMapModel", extend: c$.XModelBase, borrows: [],
//==========================================================================================

//==========================================================================================
	properties: {
//==========================================================================================
		m_numLayers: 0,						// Number;
		m_layers: [],						// Array;
		m_viewRect: null,					// XRect;
		m_allClassNames: [],				// Array;
		m_currLayer: 0,						// Number;
	
//==========================================================================================
$: function () {} }, // end properties

//==========================================================================================
	construct:
//==========================================================================================
		function () {
			if (c$.__initializing__) return;
		
			c$.XModelBase.call (this);
			
			this.m_allClassNames = new Array ();
		},

//==========================================================================================
	methods: {
//==========================================================================================

//------------------------------------------------------------------------------------------
		// __layers:Array
		setup: function (
			__layers /* Array */
			) { // void
			
			this.m_numLayers = __layers.length;	
			this.m_layers = new Array (m_numLayers);
			
			var i; /* Number */
			
			for (i=0; i<this.m_numLayers; i++) {
				this.m_layers[i] = __layers[i]
			}
		},
		
//------------------------------------------------------------------------------------------
		cleanup: function () { // void
		},
	
//------------------------------------------------------------------------------------------
		getNumLayers: function () { // Number {
			return this.m_numLayers;
		},
		
//------------------------------------------------------------------------------------------
		setCurrLayer: function (__layer /* Number */) { // void {
			this.m_currLayer = __layer;
		},
		
//------------------------------------------------------------------------------------------
		getCurrLayer: function () { // Number {
			return this.m_currLayer;
		},
		
//------------------------------------------------------------------------------------------
		getAllClassNames: function () { // Array
			var i, /* Number */ j; /* Number */
			
			if (this.m_allClassNames.length == 0) {
				for (i=0; i<this.m_numLayers; i++) {
					var __classNames /* Array */ = this.m_layers[i].getAllClassNames ();
				
					for (j=0; j<__classNames.length; j++) {
						this.m_allClassNames.push (__classNames[j]);
					}
				}
			}
			
			return this.m_allClassNames;
		},
		
//------------------------------------------------------------------------------------------
		// __layer:Number
		getLayer: function (__layer /* Number */) { // XMapLayerModel
			return this.m_layers[__layer];
		},		
		
//------------------------------------------------------------------------------------------
		// __layer:Number, __item:XMapItemModel
		addItem: function (__layer, /* Number */ __item /* XMapItemModel */) { // void
			this.m_layers[__layer].addItem (__item);
		},

//------------------------------------------------------------------------------------------
		// __layer:Number, __item:XMapItemMode
		removeItem: function (__layer, /* Number */ __item /* XMapItemModel */) { // void
			this.m_layers[__layer].removeItem (__item);
		},
		
//------------------------------------------------------------------------------------------
		// __layer:Number,
		// __x1:Number, __y1:Number,
		// __x2:Number, __y2:Number
		getSubmapsAt: function (
			__layer, /* Number */
			__x1, /* Number */ __y1, /* Number */
			__x2, /* Number */ __y2 /* Number */
			) { // Array
				
			return this.m_layers[__layer].getSubmapsAt (__x1, __y1, __x2, __y2);
		},

//------------------------------------------------------------------------------------------
		// __layer:Number,
		// __x1:Number, __y1:Number,
		// __x2:Number, __y2:Number
		getItemsAt: function (
			__layer, /* Number */
			__x1, /* Number */ __y1, /* Number */
			__x2, /* Number */ __y2 /* Number */
			) { // Array
				
			return this.m_layers[__layer].getItemsAt (__x1, __y1, __x2, __y2);
		},
		
//------------------------------------------------------------------------------------------
		// __layer:Number,
		// __x1:Number, __y1:Number,
		// __x2:Number, __y2:Number
		getItemsAtCX: function (
			__layer, /* Number */
			__x1, /* Number */ __y1, /* Number */
			__x2, /* Number */ __y2 /* Number */
			) { // Array
				
			return this.m_layers[__layer].getItemsAtCX (__x1, __y1, __x2, __y2);
		},
		
//------------------------------------------------------------------------------------------
		// __left:Number, __top:Number,
		// __width:Number, __height:Number
		setViewRect: function (
			__left, /* Number */ __top, /* Number */
			__width, /* Number */ __height /* Number */
			) { // void
				
			this.m_viewRect = new c$.XRect (__left, __top, __width, __height);
		},
		
//------------------------------------------------------------------------------------------	
		getViewRect: function () { // XRect
			return this.m_viewRect
		},

//------------------------------------------------------------------------------------------	
		serializeAll: function () { // XSimpleXMLNode
			return this.serialize ();
		},
		
//------------------------------------------------------------------------------------------
		//__xml:XSimpleXMLNode
		deserializeAll: function (__xml /* XSimpleXMLNode */) { // void
			g$.trace (": [XMap] deserializeAll: ");
			
			this.deserialize (__xml);
		},
		
//------------------------------------------------------------------------------------------
		serialize: function () { // XSimpleXMLNode
			var xml /* XSimpleXMLNode */ = new c$.XSimpleXMLNode ();
			
			xml.setupWithParams ("XMap", "", []);
			
			xml.addChildWithXMLNode (this.serializeLayers ());
							
			return xml;
		},
		
//------------------------------------------------------------------------------------------	
		serializeLayers: function () { // XSimpleXMLNode
			var xml /* XSimpleXMLNode */ = new c$.XSimpleXMLNode ();
			
			xml.setupWithParams ("XLayers", "", []);
	
			var i; /* Number */
			
			for (i=0; i<this.m_numLayers; i++) {
				this.m_layers[i].serialize (xml);
			}
			
			return xml;
		},
		
//------------------------------------------------------------------------------------------
		// __xml:XSimpleXMLNode
		deserialize: function (__xml /* XSimpleXMLNode */) {// void
			g$.trace (": [XMap] deserialize: ");
			
			var __xmlList /* Array */ = __xml.child ("XLayers")[0].child ("XLayer");
			
			this.m_numLayers = __xmlList.length;
			this.m_layers = Array (m_numLayers);
			
			var i; /* Number */
			
			for (i=0; i<__xmlList.length; i++) {
				this.m_layers[i] = new c$.XMapLayerModel ();
				
				this.m_layers[i].deserialize (__xmlList[i]);
			}
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