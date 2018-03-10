//==========================================================================================
(function() { var c$ = {__initializing__: false};
//==========================================================================================
var n$ = g$.namespace ("X.XMap");
	
g$.import (
		function () {
			g$.import ("X.Collections.*");
			g$.import ("X.Geom.*");
			g$.import ("X.Task.*");
			g$.import ("X.World.*");
			g$.import ("X.World.Logic.*");
			g$.import ("X.World.Sprite.*");
		}
	);

//==========================================================================================
	g$.class (c$, n$, {

//==========================================================================================
	name: "XMapLayerView", extend: c$.XLogicObject, borrows: [],
//==========================================================================================

//==========================================================================================
	properties: {
//==========================================================================================
		m_XMapItemToXLogicObject: null,			// XDict;
		m_XMapModel: null,						// XMapModel;
		m_currLayer: 0,							// Number;
	
	
//==========================================================================================
$: function () {} }, // end properties

//==========================================================================================
	construct:
//==========================================================================================
		function () {
			if (c$.__initializing__) return;
			
			c$.XLogicObject.call (this);
		},

//==========================================================================================
	methods: {
//==========================================================================================

//------------------------------------------------------------------------------------------
		setup: function (__xxx, /* XWorld */ args /* Array */) { // void {
			c$.XLogicObject.prototype.setup .call (this, __xxx, args);
			
			this.m_XMapModel = this.getArg (args, 0);
			this.m_currLayer = this.getArg (args, 1);
			
			this.m_XMapItemToXLogicObject = new c$.XDict ();
		},
		
//------------------------------------------------------------------------------------------
		cleanup: function () { // void {
			c$.XLogicObject.prototype.cleanup.call (this);
		},
	
//------------------------------------------------------------------------------------------
		setupX: function () { // void {
		},
		
//------------------------------------------------------------------------------------------
		updateFromXMapModel: function () { // void {
			var __view /* XRect */ = this.xxx.getXWorldLayer (this.m_currLayer).viewPort (512, 512);			
			var __items; /* Array */
							
			__items = this.m_XMapModel.getItemsAt (
				this.m_currLayer,
				__view.left, __view.top,
				__view.right, __view.bottom
			);	
			
//------------------------------------------------------------------------------------------
			var __item; /* XMapItemModel */
			var i; /* Number */
									
			for (i=0; i<__items.length; i++) {
				__item = __items[i] as XMapItemModel;
						
				this.updateXMapItemModel (__item);
			}
		},
		
//------------------------------------------------------------------------------------------
		updateXMapItemModel: function (__item /* XMapItemModel */) { // void {
			if (!__item.inuse) {
				this.addXMapItem (
					// item
					__item,
					// depth
					0
				);
			}
			else
			{
				if (this.m_XMapItemToXLogicObject.exists (__item)) {
					var logicObject /* XLogicObject */ = this.m_XMapItemToXLogicObject.get (__item);
							
					logicObject.setPos (new c$.XPoint (__item.x, __item.y));
				}
			}
		},
		
//------------------------------------------------------------------------------------------
		addXMapItem: function (__item, /* XMapItemModel */ __depth /* Number */) { // void {	
			var __logicObject /* XLogicObject */ =
			  this.xxx.getXLogicManager ().createXLogicObjectFromClassName (
				// parent
					null,
				// logicClassName
					__item.logicClassName,
				// item, layer, depth
					__item, this.m_currLayer, __depth,
				// x, y, z
					__item.x, __item.y, 0,
				// scale, rotation
					__item.scale, __item.rotation,
				// imageClassName
					__item.imageClassName	
				);
			
			__item.inuse++;
				
			this.m_XMapItemToXLogicObject.put (__item, __logicObject);
			
			__logicObject.addKillListener (this.removeXMapItem);
			
			__logicObject.show ();
		},
		
		
//------------------------------------------------------------------------------------------
		removeXMapItem: function (args) { // void {
			var item /* XMapItemModel */ = args[0]; /* as XMapItemModel */
					
			if (this.m_XMapItemToXLogicObject.exists (item)) {		
				this.m_XMapItemToXLogicObject.remove (item);
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