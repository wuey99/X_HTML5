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

//==========================================================================================
	g$.class (c$, n$, {

//==========================================================================================
	name: "XMapItemModel", extend: c$.XModelBase, borrows: [],
//==========================================================================================

//==========================================================================================
	properties: {
//==========================================================================================
		m_layerModel: null,						// XMapLayerModel;
		m_logicClassIndex: 0,					// int;
		m_name: "",								// String;
		m_id: 0,								// Number;
		m_imageClassIndex: 0,					// int;
		m_frame: 0,								// Number;
		m_x: 0,									// Number;
		m_y: 0,									// Number;
		m_rotation: 0,							// Number;
		m_scale: 0,								// Number;
		m_depth: 0,								// Number;
		m_collisionRect: null,					// XRect;
		m_boundingRect: null,					// XRect;
		m_params: "", 							// String;
		m_inuse: 0,								// Number;
	
//==========================================================================================
$: function () {} }, // end properties

//==========================================================================================
	construct:
//==========================================================================================
		function () {
			if (c$.__initializing__) return;
		
			c$.XModelBase.call (this);
			
			this.m_id = -1;
		
			this.m_inuse = 0;
		},

//==========================================================================================
	methods: {
//==========================================================================================

//------------------------------------------------------------------------------------------
		// __layerModel:XMapLayerModel,
		// __logicClassName:String,
		// __name:String, __id:Number,
		// __imageClassName:String, __frame:Number,
		// __x:Number, __y:Number,
		// __scale:Number, __rotation:Number, __depth:Number,
		// __collisionRect:XRect,
		// __boundingRect:XRect,
		// __params:String,
		// ...args
		setup: function (
			__layerModel, /* XMapLayerModel */
			__logicClassName, /* String */
			__name, /* String */ __id, /* Number */
			__imageClassName, /* String */ __frame, /* Number */
			__x, /* Number */ __y, /* Number */
			__scale, /* Number */ __rotation, /* Number */ __depth, /* Number */
			__collisionRect, /* XRect */
			__boundingRect, /* XRect */
			__params, /* String */
			args /* Array */
			) { // void
				
				this.m_layerModel = __layerModel;
				this.m_logicClassIndex = this.m_layerModel.getIndexFromClassName (__logicClassName);
				this.m_name = __name;
				this.m_id = __id;
				this.m_imageClassIndex = this.m_layerModel.getIndexFromClassName (__imageClassName);
				this.m_frame = __frame;
				this.m_x = __x;
				this.m_y = __y;
				this.m_scale = __scale;
				this.m_rotation = __rotation;
				this.m_depth = __depth;
				this.m_collisionRect = __collisionRect;
				this.m_boundingRect = __boundingRect;
				this.m_params = __params;
		},

//------------------------------------------------------------------------------------------
		cleanup: function () { // void
		},

//------------------------------------------------------------------------------------------
		kill: function () { // void
			this.m_layerModel.removeIndexFromClassNames (logicClassIndex);
			this.m_layerModel.removeIndexFromClassNames (imageClassIndex);
		},

//------------------------------------------------------------------------------------------
		clone: function () { // XMapItemModel
			var __item /* XMapItemModel */ = new c$.XMapItemModel ();

			__item.setup (
				this.layerModel,
// __logicClassName
				this.layerModel.getClassNameFromIndex (this.m_logicClassIndex),
// __name, __id
				"", -1,
// __imageClassName, __frame
				this.layerModel.getClassNameFromIndex (this.m_imageClassIndex), 0,
// __x, __y,
				this.x, this.y,
// __scale, __rotation, __depth
				this.scale, this.rotation, this.depth,
// __collisionRect,
				this.collisionRect.cloneX (),
// __boundingRect,
				this.boundingRect.cloneX (),
// __params
				this.params
			);
			
			return __item;
		},
		
//------------------------------------------------------------------------------------------
		getID: function () { // Number
			return this.m_id;
		},
		
//------------------------------------------------------------------------------------------
		// __id:Number
		setID: function (__id) { // void
			this.m_id = __id;
		},

//------------------------------------------------------------------------------------------
		serialize: function () { // XSimpleXMLNode
			var xml /* XSimpleXMLNode */ = new c$.XSimpleXMLNode ();
			
			var __attribs /* Array */ = [
				"logicClassIndex",	this.logicClassIndex,
				"name",				this.name,
				"id",				this.id,
				"imageClassIndex",	this.imageClassIndex,
				"frame",			this.frame,
				"x",				this.x,
				"y",				this.y,
				"rotation",			this.rotation,
				"scale",			this.scale,
				"depth",			this.depth,
				"cx",				this.collisionRect.x,
				"cy",				this.collisionRect.y,
				"cw",				this.collisionRect.width,
				"ch",				this.collisionRect.height,
				"bx",				this.boundingRect.x,
				"by",				this.boundingRect.y,
				"bw",				this.boundingRect.width,
				"bh",				this.boundingRect.height
			];
			
			xml.setupWithParams ("XMapItem", "", __attribs);
			
			xml.addChildWithXMLString (params);
			
			return xml;
		},
		
//==========================================================================================
$: function () {} }, // end methods

//==========================================================================================
accessors: {
//==========================================================================================

//------------------------------------------------------------------------------------------
		layerModel: {
			get: function () { // XMapLayerModel
				return this.m_layerModel;
			},
			
			set: function (__value) {
				this.m_layerModel = __value;
			}
		},

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
		id: {
			get: function () { // Number
				return this.m_id;
			},
			
			set: function (__value) {
				this.m_id = __value;
			}
		},

//------------------------------------------------------------------------------------------
		name: {
			get: function () { // String
				return this.m_name;
			},
			
			set: function (__value) {
				this.m_name = __value;
			}
		},
		
//------------------------------------------------------------------------------------------
		logicClassIndex: {
			get: function () { // int
				return this.m_logicClassIndex;
			},
			
			set: function (__value) {
				this.m_logicClassIndex = __value;
			}
		},

//------------------------------------------------------------------------------------------
		imageClassIndex: {
			get: function () { // int
				return this.m_imageClassIndex;
			},
			
			set: function (__value) {
				this.m_imageClassIndex = __value;
			}
		},
	
//------------------------------------------------------------------------------------------
		frame: {
			get: function () { // Number
				return this.m_frame;
			},
			
			set: function (__value) {
				this.m_frame = __value;
			}
		},

//------------------------------------------------------------------------------------------
		x: {
			get: function () { // Number
				return this.m_x;
			},
			
			set: function (__value) {
				this.m_x = __value;
			}
		},
		
//------------------------------------------------------------------------------------------
		y: {
			get: function () { // Number
				return this.m_y;
			},
			
			set: function (__value) {
				this.m_y = __value;
			}
		},
		
//------------------------------------------------------------------------------------------
		rotation: {
			get: function () { // Number
				return this.m_rotation;
			},
			
			set: function (__value) {
				this.m_rotation = __value;
			}
		},
	
//------------------------------------------------------------------------------------------
		scale: {
			get: function () { // Number
				return this.m_scale;
			},
			
			set: function (__value) {
				this.m_scale = __value;
			}
		},
	
//------------------------------------------------------------------------------------------
		depth: {
			get: function () { // Number
				return this.m_depth;
			},
			
			set: function (__value) {
				this.m_depth = __value;
			}
		},
		
//------------------------------------------------------------------------------------------
		boundingRect: {
			get: function () { // XRect
				return this.m_boundingRect;
			},
			
			set: function (__value) {
				this.m_boundingRect = __value;
			}
		},
		
//------------------------------------------------------------------------------------------
		collisionRect: { // XRect
			get: function () {
				return this.m_collisionRect;
			},
			
			set: function (__value) {
				this.m_collisionRect = __value;
			}
		},
		
//------------------------------------------------------------------------------------------
		params: {
			get: function () { // String
				return this.m_params;
			},
			
			set: function (__value) {
				this.m_params = __value;
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