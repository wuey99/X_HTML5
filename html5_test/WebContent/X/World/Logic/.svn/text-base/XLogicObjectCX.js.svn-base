//==========================================================================================
(function() { var c$ = {__initializing__: false};
//==========================================================================================
var n$ = g$.namespace ("X.World.Logic");

g$.import (
		function () {
			g$.import (c$, "X.Collections.*");
			g$.import (c$, "X.Geom.*");
			g$.import (c$, "X.Task.*");
			g$.import (c$, "X.World.*");
			g$.import (c$, "X.World.Logic.*");
			g$.import (c$, "X.World.Sprite.*");
			g$.import (c$, "X.XMap.*");
		}
	);

//==========================================================================================
	g$.class (c$, n$, {

//==========================================================================================
	name: "XLogicObjectCX", extend: c$.XLogicObject, borrows: [c$.XRegistration_impl],
//==========================================================================================

//==========================================================================================
	properties: {
//==========================================================================================
		m_vel: null,						// XPoint;
		m_oldPos: null,						// XPoint;
	
		m_cx: null,							// XRect;
		m_namedCX: null,					// XDict;

		m_XMapModel: null,					// XMapModel;
		m_XMapView: null,					// XMapView;
		m_XMapLayerModel: null,				// XMapLayerModel;
		m_XSubmaps: null,					// Array;
		m_submapWidth: 0,					// int;
		m_submapHeight:0,					// int;
		m_submapWidthMask: 0,				// int;
		m_submapHeightMask: 0,				// int;
		m_cols: 0,							// int;
		m_rows: 0,							// int;
		
		m_CX_Collide_Flag: null,			// Number;
	
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
		// __xxx:XWorld, args:Array
		setup: function (__xxx, /* XWorld */ args /* Array */) { // void
			c$.XLogicObject.prototype.setup.call (this, __xxx, args);
			
			this.m_XMapModel = null;
			this.m_XMapView = null;
		},
		
//------------------------------------------------------------------------------------------
		cleanup: function () { // void
			c$.XLogicObject.prototype.cleanup.call (this);
		},
	
//------------------------------------------------------------------------------------------
		setupX: function () { // void
			this.setVel (new c$.XPoint (0, 0));
			this.setOld (new c$.XPoint (0, 0));
			
			this.m_cx = new c$.XRect (0, 0, 0, 0);
			this.m_namedCX = new c$.XDict ();
		},
	
//------------------------------------------------------------------------------------------
		// __XMapModel:XMapModel, __XMapView:XMapVie
		setXMapModel: function (__XMapModel, __XMapView) { // void {
			this.m_XMapModel = __XMapModel;
			this.m_XMapView = __XMapView;
			
			this.m_XMapLayerModel = this.m_XMapModel.getLayer (this.getLayer ());
			
			thism_XSubmaps = this.m_XMapLayerModel.submaps ();
			
			this.m_submapWidth = this.m_XMapLayerModel.getSubmapWidth ();
			this.m_submapHeight = this.m_XMapLayerModel.getSubmapHeight ();
			
			this.m_submapWidthMask = this.m_submapWidth - 1;
			this.m_submapHeightMask = this.m_submapHeight - 1;
			
			this.m_cols = this.m_submapWidth/XSubmapModel.CX_TILE_WIDTH;
			this.m_rows = this.m_submapHeight/XSubmapModel.CX_TILE_HEIGHT;
			
			g$.trace (": --------------------------------:");
			g$.trace (": submapWidth: ", m_submapWidth);
			g$.trace (": submapHeight: ", m_submapHeight);
			g$.trace (": submapWidthMask: ", m_submapWidthMask);
			g$.trace (": submapHeightMask: ", m_submapHeightMask);
			g$.trace (": m_cols: ", m_cols);
			g$.trace (": m_rows: ", m_rows);
			g$.trace (": tileWidth: ", XSubmapModel.CX_TILE_WIDTH);
			g$.trace (": tileWidthMask: ", XSubmapModel.CX_TILE_WIDTH_MASK);
			g$.trace (": tileWidthUnmask: ", XSubmapModel.CX_TILE_WIDTH_UNMASK);
			g$.trace (": tileHeight: ", XSubmapModel.CX_TILE_HEIGHT);
			g$.trace (": tileHeightMask: ", XSubmapModel.CX_TILE_HEIGHT_MASK);
			g$.trace (": tileHeightUnMask: ", XSubmapModel.CX_TILE_HEIGHT_UNMASK);
		},
		
//------------------------------------------------------------------------------------------
		getXMapModel: function () { // XMapModel {
			return this.m_XMapModel;
		},
		
//------------------------------------------------------------------------------------------
		getXMapView: function () { // XMapView {
			return this.m_XMapView;
		},

//------------------------------------------------------------------------------------------
		// __x1:Number,
		// __x2:Number,
		// __y1:Number,
		// __y2:Number
		setCX: function (
			__x1, /* Number */
			__x2, /* Number */
			__y1, /* Number */
			__y2 /* Number */
			) { // void {
				
			this.m_cx = new c$.XRect (__x1, __y1, __x2-__x1+1, __y2-__y1+1);
			
			trace (": left, right, top, bottom ", m_cx.left, m_cx.right, m_cx.top, m_cx.bottom);
			trace (": width, height: ", m_cx.width, m_cx.height);
		},
		
//------------------------------------------------------------------------------------------
		// __name:String,
		// __x1:Number,
		// __x2:Number,
		// __y1:Number,
		// __y2:Number
		setNamedCX: function (
			__name, /* *String */
			__x1, /* Number */
			__x2, /* Number */
			__y1, /* Number */
			__y2  /* Number */
			) { // void {
				
			this.m_namedCX.put (__name, new c$.XRect (__x1, __y1, __x2-__x1+1, __y2-__y1+1));
		},
		
//------------------------------------------------------------------------------------------
		// __name:String
		getNamedCX: function (__name /* String */) { // XRect
			return this.m_namedCX.get (__name).cloneX ();
		},
		
//------------------------------------------------------------------------------------------
		// __name:String
		getAdjustedNamedCX: function (__name /* String */) { // XRect
			var __rect /* XRect */ = this.m_namedCX.get (__name).cloneX ();	
			__rect.offset (oX, oY);
			return __rect;
		},
	
//------------------------------------------------------------------------------------------
		// __vel:XPoint
		setVel: function (__vel /* XPoint */) { // void 
			this.m_vel = __vel;
		},
		
//------------------------------------------------------------------------------------------
		getVel: function () { // XPoint
			return this.m_vel;
		},
		
//------------------------------------------------------------------------------------------
		// __pos:XPoint
		setOld: function (__pos /* XPoint */) { // void
			this.m_oldPos = __pos;
		},
		
//------------------------------------------------------------------------------------------
		getOld: function () { // XPoint
			return this.m_oldPos;
		},
		
//------------------------------------------------------------------------------------------
		// __name:String, __rectDst:XRect
		collidesWithNamedCX: function (__name, /* String */ __rectDst /* XRect */) { // Boolean
			var __rectSrc /* XRect */ = this.getAdjustedNamedCX (__name);
			
			return __rectSrc.intersects (__rectDst);
		},
		
//------------------------------------------------------------------------------------------
		updatePhysics: function () { // void {
			this.m_CX_Collide_Flag = 0;

//------------------------------------------------------------------------------------------			
			this.oX += this.oDX;
			
//			if (Math.floor (oX) != Math.floor (oldX)) {
			{
				if (this.oDX == 0) {
					
				}
				else if (this.oDX < 0) {
					this.Ck_Collide_LF ();
					this.Ck_Slope_LF ();
				}
				else
				{
					this.Ck_Collide_RT ();
					this.Ck_Slope_RT (); 
				}
			}
			
//------------------------------------------------------------------------------------------
			this.oY += this.oDY;
			
//			if (Math.floor (oY) != Math.floor (oldY)) {
			{
				if (this.oDY == 0) {
					
				}
				else if (this.oDY < 0) {
					this.Ck_Collide_UP ();
					this.Ck_Slope_UP ();
				}
				else
				{
					this.Ck_Collide_DN ();
					this.Ck_Slope_DN ();
				}
			}
		},
		
//------------------------------------------------------------------------------------------
		Ck_Collide_UP: function () { // Boolean {
			var x1, /* Number */ y1, /* Number */ x2, /* Number */ y2; /* Number */
			var i, /* Number */ __x, /* Number */ __y; /* Number */
			var collided; /* Boolean */
			var cx; /* Number */
			var r, /* int */ c; /* int */
			
			x1 = Math.floor (this.oX) + this.m_cx.left;
			x2 = Math.floor (this.oX) + this.m_cx.right;
			y1 = Math.floor (this.oY) + this.m_cx.top;
			y2 = Math.floor (this.oY) + this.m_cx.bottom;
						
			y1 &= c$.XSubmapModel.CX_TILE_HEIGHT_UNMASK;
			
			this.collided = false;
			
			for (__x = (x1 & c$.XSubmapModel.CX_TILE_WIDTH_UNMASK); __x <= (x2 & c$.XSubmapModel.CX_TILE_WIDTH_UNMASK); __x += c$.XSubmapModel.CX_TILE_WIDTH) {
				c = __x/this.m_submapWidth;
				r = y1/this.m_submapHeight;
				i = (Math.floor ((y1 & this.m_submapHeightMask)/c$.XSubmapModel.CX_TILE_HEIGHT) * this.m_cols) + Math.floor ((__x & this.m_submapWidthMask)/c$.XSubmapModel.CX_TILE_WIDTH);
				cx = this.m_XSubmaps[r][c].cmap[i];
				if (cx >=0 && cx < c$.XSubmapModel.CX_MAX)
				([
					// CX_EMPTY:
						nothing,
					// CX_SOLID:
						function () { // void {
							this.m_CX_Collide_Flag |= c$.CX_COLLIDE_UP;
				
							this.oY = (y1 + c$.XSubmapModel.CX_TILE_HEIGHT - this.m_cx.top);
			
							collided = true;
						},
					// CX_SOFT:
						nothing,
					// CX_JUMP_THRU:
						nothing,
						
					// CX_UL45:
						nothing,
					// CX_UR45:
						nothing,
					// CX_LL45:
						nothing,
					// CX_LR45:
						nothing,
					
					// CX_UL225A:
						nothing,
					// CX_UL225B:
						nothing,
					// CX_UR225A:
						nothing,
					// CX_UR225B:
						nothing,
					// CX_LL225A:
						nothing,
					// CX_LL225B:
						nothing,
					// CX_LR225A:
						nothing,
					// CX_LR225B:
						nothing,
					
					// CX_UL675A:
						nothing,
					// CX_UL675B:
						nothing,
					// CX_UR675A:
						nothing,
					// CX_UR675B:
						nothing,
					// CX_LL675A:
						nothing,
					// CX_LL675B:
						nothing,
					// CX_LR675A:
						nothing,
					// CX_LR675B:
						nothing,
						
					// CX_SOFTLF:
						nothing,
					// CX_SOFTRT:
						nothing,
					// CX_SOFTUP:
						nothing,
					// CX_SOFTDN:
						function () { // void {
							this.m_CX_Collide_Flag |= c$.CX_COLLIDE_UP;
				
							this.oY = (y1 + c$.XSubmapModel.CX_TILE_HEIGHT - this.m_cx.top);
			
							collided = true;
						},
				])[cx] ();
				
				if (collided) {
					return true;
				}
			}
			
			return false;
		},
		
//------------------------------------------------------------------------------------------
		Ck_Collide_DN: function () { // Boolean {
			var x1, /* Number */ y1, /* Number */ x2, /* Number */ y2; /* Number */
			var i, /* Number */ __x, /* Number */ __y; /* Number */
			var collided; /* Boolean */
			var cx; /* Number */
			var r, /* int */ c; /* int */
			
			x1 = Math.floor (this.oX) + this.m_cx.left;
			x2 = Math.floor (this.oX) + this.m_cx.right;
			y1 = Math.floor (this.oY) + this.m_cx.top;
			y2 = Math.floor (this.oY) + this.m_cx.bottom;
							
			y2 &= c$.XSubmapModel.CX_TILE_HEIGHT_UNMASK;
			
			collided = false;
			
			for (__x = (x1 & c$.XSubmapModel.CX_TILE_WIDTH_UNMASK); __x <= (x2 & c$.XSubmapModel.CX_TILE_WIDTH_UNMASK); __x += c$.XSubmapModel.CX_TILE_WIDTH) {
				c = __x/this.m_submapWidth;
				r = y2/this.m_submapHeight;
				i = (Math.floor ((y2 & this.m_submapHeightMask)/c$.XSubmapModel.CX_TILE_HEIGHT) * this.m_cols) + Math.floor ((__x & this.m_submapWidthMask)/c$.XSubmapModel.CX_TILE_WIDTH);
				cx = this.m_XSubmaps[r][c].cmap[i];
				if (cx >=0 && cx < c$.XSubmapModel.CX_MAX)
				([
					// CX_EMPTY:
						nothing,
					// CX_SOLID:
						function () { // void {
							this.m_CX_Collide_Flag |= c$.CX_COLLIDE_DN;
				
							this.oY = (y2 - (this.m_cx.bottom) - 1);
										
							collided = true;
						},
					// CX_SOFT:
						nothing,
					// CX_JUMP_THRU:
						nothing,
						
					// CX_UL45:
						nothing,
					// CX_UR45:
						nothing,
					// CX_LL45:
						nothing,
					// CX_LR45:
						nothing,
					
					// CX_UL225A:
						nothing,
					// CX_UL225B:
						nothing,
					// CX_UR225A:
						nothing,
					// CX_UR225B:
						nothing,
					// CX_LL225A:
						nothing,
					// CX_LL225B:
						nothing,
					// CX_LR225A:
						nothing,
					// CX_LR225B:
						nothing,
					
					// CX_UL675A:
						nothing,
					// CX_UL675B:
						nothing,
					// CX_UR675A:
						nothing,
					// CX_UR675B:
						nothing,
					// CX_LL675A:
						nothing,
					// CX_LL675B:
						nothing,
					// CX_LR675A:
						nothing,
					// CX_LR675B:
						nothing,
						
					// CX_SOFTLF:
						nothing,
					// CX_SOFTRT:
						nothing,
					// CX_SOFTUP:
						function () { // void {
							this.m_CX_Collide_Flag |= c$.CX_COLLIDE_DN;
				
							this.oY = (y2 - (this.m_cx.bottom) - 1);
										
							collided = true;
						},
					// CX_SOFTDN:
						nothing,
				])[cx] ();
				
				if (collided) {
					return true;
				}
			}
			
			return false;
		},
		
//------------------------------------------------------------------------------------------
		Ck_Collide_LF: function () { // Boolean {
			var x1, /* Number */ y1, /* Number */ x2, /* Number */ y2; /* Number */
			var i, /* Number */ __x, /* Number */ __y; /* Number */
			var collided; /* Boolean */
			var cx; /* Number */
			var r, /* int */ c; /* int */
			
			x1 = Math.floor (this.oX) + this.m_cx.left;
			x2 = Math.floor (this.oX) + this.m_cx.right;
			y1 = Math.floor (this.oY) + this.m_cx.top;
			y2 = Math.floor (this.oY) + this.m_cx.bottom;
	
			x1 &= c$.XSubmapModel.CX_TILE_WIDTH_UNMASK;
			
			collided = false;
			
			for (__y = (y1 & c$.XSubmapModel.CX_TILE_HEIGHT_UNMASK); __y <= (y2 & c$.XSubmapModel.CX_TILE_HEIGHT_UNMASK); __y += c$.XSubmapModel.CX_TILE_HEIGHT) {
				c = x1/this.m_submapWidth;
				r = __y/this.m_submapHeight;
				i = (Math.floor ((__y & this.m_submapHeightMask)/c$.XSubmapModel.CX_TILE_HEIGHT) * this.m_cols) + Math.floor ((x1 & this.m_submapWidthMask)/c$.XSubmapModel.CX_TILE_WIDTH);
				cx = this.m_XSubmaps[r][c].cmap[i];
				if (cx >=0 && cx < c$.XSubmapModel.CX_MAX)
				([
					// CX_EMPTY:
						nothing,
					// CX_SOLID:
							function () { // void {
								this.m_CX_Collide_Flag |= c$.CX_COLLIDE_LF;
			
								this.oX = (x1 + XSubmapModel.CX_TILE_WIDTH - this.m_cx.left);
				
								collided = true;
							},
					// CX_SOFT:
						nothing,
					// CX_JUMP_THRU:
						nothing,
						
					// CX_UL45:
						nothing,
					// CX_UR45:
						nothing,
					// CX_LL45:
						nothing,
					// CX_LR45:
						nothing,
					
					// CX_UL225A:
						nothing,
					// CX_UL225B:
						nothing,
					// CX_UR225A:
						nothing,
					// CX_UR225B:
						nothing,
					// CX_LL225A:
						nothing,
					// CX_LL225B:
						nothing,
					// CX_LR225A:
						nothing,
					// CX_LR225B:
						nothing,
					
					// CX_UL675A:
						nothing,
					// CX_UL675B:
						nothing,
					// CX_UR675A:
						nothing,
					// CX_UR675B:
						nothing,
					// CX_LL675A:
						nothing,
					// CX_LL675B:
						nothing,
					// CX_LR675A:
						nothing,
					// CX_LR675B:
						nothing,
						
					// CX_SOFTLF:
						nothing,
					// CX_SOFTRT:
							function () { // void {
								this.m_CX_Collide_Flag |= c$.CX_COLLIDE_LF;
			
								this.oX = (x1 + c$.XSubmapModel.CX_TILE_WIDTH - this.m_cx.left);
				
								collided = true;
							},
					// CX_SOFTUP:
						nothing,
					// CX_SOFTDN:
						nothing,
				])[cx] ();
				
				if (collided) {
					return true;
				}
			}
			
			return false;
		},
	
//------------------------------------------------------------------------------------------
		Ck_Collide_RT: function () { // Boolean
			var x1, /* Number */ y1, /* Number */ x2, /* Number */ y2; /* Number */
			var i, /* Number */ __x, /* Number */ __y; /* Number */
			var collided; /* Boolean */
			var cx; /* Number */
			var r, /* int */ c; /* int */
			
			x1 = Math.floor (this.oX) + this.m_cx.left;
			x2 = Math.floor (this.oX) + this.m_cx.right;
			y1 = Math.floor (this.oY) + this.m_cx.top;
			y2 = Math.floor (this.oY) + this.m_cx.bottom;
						
			x2 &= c$.XSubmapModel.CX_TILE_WIDTH_UNMASK;
			
			collided = false;
			
			for (__y = (y1 & c$.XSubmapModel.CX_TILE_HEIGHT_UNMASK); __y <= (y2 & c$.XSubmapModel.CX_TILE_HEIGHT_UNMASK); __y += c$.XSubmapModel.CX_TILE_HEIGHT) {
				c = x2/c$.m_submapWidth;
				r = __y/c$.m_submapHeight;
				i = (Math.floor ((__y & this.m_submapHeightMask)/c$.XSubmapModel.CX_TILE_HEIGHT) * this.m_cols) + Math.floor ((x2 & this.m_submapWidthMask)/c$.XSubmapModel.CX_TILE_WIDTH);
				cx = this.m_XSubmaps[r][c].cmap[i];
				if (cx >=0 && cx < c$.XSubmapModel.CX_MAX)
				([
					// CX_EMPTY:
						nothing,
					// CX_SOLID:
						function () { // void {
							this.m_CX_Collide_Flag |= c$.CX_COLLIDE_RT;
		
							this.oX = (x2 - (this.m_cx.right) - 1);
			
							collided = true;
						},
					// CX_SOFT:
						nothing,
					// CX_JUMP_THRU:
						nothing,
						
					// CX_UL45:
						nothing,
					// CX_UR45:
						nothing,
					// CX_LL45:
						nothing,
					// CX_LR45:
						nothing,
					
					// CX_UL225A:
						nothing,
					// CX_UL225B:
						nothing,
					// CX_UR225A:
						nothing,
					// CX_UR225B:
						nothing,
					// CX_LL225A:
						nothing,
					// CX_LL225B:
						nothing,
					// CX_LR225A:
						nothing,
					// CX_LR225B:
						nothing,
					
					// CX_UL675A:
						nothing,
					// CX_UL675B:
						nothing,
					// CX_UR675A:
						nothing,
					// CX_UR675B:
						nothing,
					// CX_LL675A:
						nothing,
					// CX_LL675B:
						nothing,
					// CX_LR675A:
						nothing,
					// CX_LR675B:
						nothing,
						
					// CX_SOFTLF:
						function () { // void {
							this.m_CX_Collide_Flag |= c$.CX_COLLIDE_RT;
		
							this.oX = (x2 - (this.m_cx.right) - 1);
			
							collided = true;
						},
					// CX_SOFTRT:
						nothing,
					// CX_SOFTUP:
						nothing,
					// CX_SOFTDN:
						nothing,
				])[cx] ();
				
				if (collided) {
					return true;
				}
			}
			
			return false;
		},
	
//------------------------------------------------------------------------------------------
		Ck_Slope_RT: function () { // Boolean {
			var x1, /* Number */ y1, /* Number */ x2, /* Number */ y2; /* Number */
			var i, /* Number */ __x, /* Number */ __y; /* Number */
			var collided; /* Boolean */
			var looking = true; /* Boolean */
			var cx; /* Number */
			var r, /* int */ c; /* int  */
			
			collided = false;
			
//------------------------------------------------------------------------------------------
// top
//------------------------------------------------------------------------------------------
			x1 = Math.floor (this.oX) + this.m_cx.left;
			x2 = Math.floor (this.oX) + this.m_cx.right;
			y1 = Math.floor (this.oY) + this.m_cx.top;
			y2 = Math.floor (this.oY) + this.m_cx.bottom;
		
			looking = true;
			
			while (looking) {
				c = x2/this.m_submapWidth;
				r = y1/this.m_submapHeight;
				i = (Math.floor ((y1 & this.m_submapHeightMask)/c$.XSubmapModel.CX_TILE_HEIGHT) * this.m_cols) + Math.floor ((x2 & this.m_submapWidthMask)/c$.XSubmapModel.CX_TILE_WIDTH);
				cx = this.m_XSubmaps[r][c].cmap[i];
				if (cx >=0 && cx < c$.XSubmapModel.CX_MAX)
				([
					// CX_EMPTY:
						__nothing,
					// CX_SOLID:
						__nothing,
					// CX_SOFT:
						function () { // void {
							y1 = (y1 & c$.XSubmapModel.CX_TILE_HEIGHT_UNMASK) + c$.XSubmapModel.CX_TILE_HEIGHT;
						},
					// CX_JUMP_THRU:
						__nothing,
						
					// CX_UL45:
						__nothing,
					// CX_UR45:
						__nothing,
					// CX_LL45:
						function () { // void {	
							var __x /* Array */ = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
							
							var x15 /* Number */ = x2 & c$.XSubmapModel.CX_TILE_WIDTH_MASK;
							var y15 /* Number */ = y1 & c$.XSubmapModel.CX_TILE_HEIGHT_MASK;

							if (y15 <= __x[x15]) {
								this.oY = ((y1 & c$.XSubmapModel.CX_TILE_HEIGHT_UNMASK) + __x[x15] - this.m_cx.top);
							}
	
							looking = false;
						},
					// CX_LR45:
						__nothing,
					
					// CX_UL225A:
						__nothing,
					// CX_UL225B:
						__nothing,
					// CX_UR225A:
						__nothing,
					// CX_UR225B:
						__nothing,
					// CX_LL225A:
						function () { // void {	
							var __x /* Array */ = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];
							
							var x15 /* Number */ = x2 & c$.XSubmapModel.CX_TILE_WIDTH_MASK;
							var y15 /* Number */ = y1 & c$.XSubmapModel.CX_TILE_HEIGHT_MASK;

							if (y15 <= __x[x15]) {
								this.oY = ((y1 & c$.XSubmapModel.CX_TILE_HEIGHT_UNMASK) + __x[x15] - this.m_cx.top);
							}
	
							looking = false;
						},
					// CX_LL225B:
						function () { // void {	
							var __x /* Array */ = [8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15];
							
							var x15 /* Number */ = x2 & c$.XSubmapModel.CX_TILE_WIDTH_MASK;
							var y15 /* Number */ = y1 & c$.XSubmapModel.CX_TILE_HEIGHT_MASK;

							if (y15 <= __x[x15]) {
								this.oY = ((y1 & c$>XSubmapModel.CX_TILE_HEIGHT_UNMASK) + __x[x15] - this.m_cx.top);
							}
	
							looking = false;
						},
					// CX_LR225A:
						__nothing,
					// CX_LR225B:
						__nothing,
					
					// CX_UL675A:
						__nothing,
					// CX_UL675B:
						__nothing,
					// CX_UR675A:
						__nothing,
					// CX_UR675B:
						__nothing,
					// CX_LL675A:
						__nothing,
					// CX_LL675B:
						__nothing,
					// CX_LR675A:
						__nothing,
					// CX_LR675B:
						__nothing,
						
					// CX_SOFTLF:
						__nothing,
					// CX_SOFTRT:
						__nothing,
					// CX_SOFTUP:
						__nothing,
					// CX_SOFTDN:
						function () { // void {
							this.oY = ((y1 & c$.XSubmapModel.CX_TILE_HEIGHT_UNMASK) + c$.XSubmapModel.CX_TILE_HEIGHT - this.m_cx.top);
							
							looking = false;
						}
				])[cx] ();
				
				if (collided) {
					return true;
				}
			}
			
//------------------------------------------------------------------------------------------
// bottom
//------------------------------------------------------------------------------------------
			x1 = Math.floor (this.oX) + this.m_cx.left;
			x2 = Math.floor (this.oX) + this.m_cx.right;
			y1 = Math.floor (this.oY) + this.m_cx.top;
			y2 = Math.floor (this.oY) + this.m_cx.bottom;
			
			looking = true;
			
			while (looking) {
				c = x2/this.m_submapWidth;
				r = y2/this.m_submapHeight;
				i = (Math.floor ((y2 & this.m_submapHeightMask)/c$.XSubmapModel.CX_TILE_HEIGHT) * this.m_cols) + Math.floor ((x2 & this.m_submapWidthMask)/c$.XSubmapModel.CX_TILE_WIDTH);
				cx = this.m_XSubmaps[r][c].cmap[i];
				if (cx >=0 && cx < c$.XSubmapModel.CX_MAX)
				([
					// CX_EMPTY:
						__nothing,
					// CX_SOLID:
						__nothing,
					// CX_SOFT:
						function () { // void {
							y2 = (y2 & c$.XSubmapModel.CX_TILE_HEIGHT_UNMASK) - 1;
						},
					// CX_JUMP_THRU:
						__nothing,
						
					// CX_UL45:
						function () { // void {	
							var __x /* Array */ = [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
							
							var x15 /* Number */ = x2 & c$.XSubmapModel.CX_TILE_WIDTH_MASK;
							var y15 /* Number */ = y2 & c$.XSubmapModel.CX_TILE_HEIGHT_MASK;

							if (y15 >= __x[x15]) {
								oY = ((y2 & c$.XSubmapModel.CX_TILE_HEIGHT_UNMASK) + __x[x15] - this.m_cx.bottom - 1);
							}
	
							looking = false;
						},			
					// CX_UR45:
						__nothing,
					// CX_LL45:
						nothing,
					// CX_LR45:
						__nothing,
					
					// CX_UL225A:
						function () { // void {	
							var __x /* Array */ = [15, 15, 14, 14, 13, 13, 12, 12, 11, 11, 10, 10, 9, 9, 8, 8];
							
							var x15 /* Number */ = x2 & c$.XSubmapModel.CX_TILE_WIDTH_MASK;
							var y15 /* Number */ = y2 & c$.XSubmapModel.CX_TILE_HEIGHT_MASK;

							if (y15 >= __x[x15]) {
								this.oY = ((y2 & c$.XSubmapModel.CX_TILE_HEIGHT_UNMASK) + __x[x15] - this.m_cx.bottom - 1);
							}
	
							looking = false;
						},	
					// CX_UL225B:
						function () { // void {	
							var __x /* Array */ = [7, 7, 6, 6, 5, 5, 4, 4, 3, 3, 2, 2, 1, 1, 0, 0];
							
							var x15 /* Number */ = x2 & c$.XSubmapModel.CX_TILE_WIDTH_MASK;
							var y15 /* Number */ = y2 & c$.XSubmapModel.CX_TILE_HEIGHT_MASK;

							if (y15 >= __x[x15]) {
								this.oY = ((y2 & c$.XSubmapModel.CX_TILE_HEIGHT_UNMASK) + __x[x15] - this.m_cx.bottom - 1);
							}
	
							looking = false;
						},	
					// CX_UR225A:
						__nothing,
					// CX_UR225B:
						__nothing,
					// CX_LL225A:
						__nothing,
					// CX_LL225B:
						__nothing,
					// CX_LR225A:
						__nothing,
					// CX_LR225B:
						__nothing,
					
					// CX_UL675A:
						__nothing,
					// CX_UL675B:
						__nothing,
					// CX_UR675A:
						__nothing,
					// CX_UR675B:
						__nothing,
					// CX_LL675A:
						__nothing,
					// CX_LL675B:
						__nothing,
					// CX_LR675A:
						__nothing,
					// CX_LR675B:
						__nothing,
						
					// CX_SOFTLF:
						__nothing,
					// CX_SOFTRT:
						__nothing,
					// CX_SOFTUP:
							function () { // void {
								this.oY = ((y2 & c$.XSubmapModel.CX_TILE_HEIGHT_UNMASK) - (this.m_cx.bottom) - 1);
								
								looking = false;								
							},
					// CX_SOFTDN:
						__nothing,
				])[cx] ();
				
				if (collided) {
					return true;
				}
			}
			
//------------------------------------------------------------------------------------------
			function __nothing () { // void {
				looking = false;
			}
			
			return false;
		},
	
//------------------------------------------------------------------------------------------
		Ck_Slope_LF: function () { // Boolean {
			var x1, /* Number */ y1, /* Number */ x2, /* Number */ y2; /* Number */
			var i, /* Number */ __x, /* Number */ __y; /* Number */
			var collided; /* Boolean */
			var looking = true; /* Boolean */;
			var cx; /* Number */
			var r, /* int */ c; /* int */
			
			collided = false;
			
//------------------------------------------------------------------------------------------
// top
//------------------------------------------------------------------------------------------
			x1 = Math.floor (this.oX) + this.m_cx.left;
			x2 = Math.floor (this.oX) + this.m_cx.right;
			y1 = Math.floor (this.oY) + this.m_cx.top;
			y2 = Math.floor (this.oY) + this.m_cx.bottom;
			
			looking = true;
			
			while (looking) {
				c = x1/this.m_submapWidth;
				r = y1/this.m_submapHeight;
				i = (Math.floor ((y1 & this.m_submapHeightMask)/c$.XSubmapModel.CX_TILE_HEIGHT) * this.m_cols) + Math.floor ((x1 & this.m_submapWidthMask)/c$.XSubmapModel.CX_TILE_WIDTH);
				cx = this.m_XSubmaps[r][c].cmap[i];
				
				if (cx >=0 && cx < c$.XSubmapModel.CX_MAX)
				([
					// CX_EMPTY:
						__nothing,
					// CX_SOLID:
						__nothing,
					// CX_SOFT:
						function () { // void {
							y1 = (y1 & c$.XSubmapModel.CX_TILE_HEIGHT_UNMASK) + c$.XSubmapModel.CX_TILE_HEIGHT;
						},
					// CX_JUMP_THRU:
						__nothing,
						
					// CX_UL45:
						__nothing,
					// CX_UR45:
						__nothing,
					// CX_LL45:
						__nothing,
					// CX_LR45:
						function () { // void {	
							var __x /* Array */ = [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
							
							var x15 /* Number */ = x1 & c$.XSubmapModel.CX_TILE_WIDTH_MASK;
							var y15 /* Number */ = y1 & c$.XSubmapModel.CX_TILE_HEIGHT_MASK;

							if (y15 <= __x[x15]) {
								this.oY = ((y1 & c$.XSubmapModel.CX_TILE_HEIGHT_UNMASK) + __x[x15] - this.m_cx.top);
							}
	
							looking = false;
						},			
					// CX_UL225A:
						__nothing,
					// CX_UL225B:
						__nothing,
					// CX_UR225A:
						__nothing,
					// CX_UR225B:
						__nothing,
					// CX_LL225A:
						__nothing,
					// CX_LL225B:
						__nothing,
					// CX_LR225A:
						function () { // void {	
							var __x /* Array */ = [15, 15, 14, 14, 13, 13, 12, 12, 11, 11, 10, 10, 9, 9, 8, 8];
							
							var x15 /* Number */ = x1 & c$.XSubmapModel.CX_TILE_WIDTH_MASK;
							var y15 /* Number */ = y1 & c$.XSubmapModel.CX_TILE_HEIGHT_MASK;

							if (y15 <= __x[x15]) {
								this.oY = ((y1 & c$.XSubmapModel.CX_TILE_HEIGHT_UNMASK) + __x[x15] - this.m_cx.top);
							}
	
							looking = false;
						},		
					// CX_LR225B:
						function () { // void {	
							var __x /* Array */ = [7, 7, 6, 6, 5, 5, 4, 4, 3, 3, 2, 2, 1, 1, 0, 0];
							
							var x15 /* Number */ = x1 & c$.XSubmapModel.CX_TILE_WIDTH_MASK;
							var y15 /* Number */ = y1 & c$.XSubmapModel.CX_TILE_HEIGHT_MASK;

							if (y15 <= __x[x15]) {
								this.oY = ((y1 & c$.XSubmapModel.CX_TILE_HEIGHT_UNMASK) + __x[x15] - this.m_cx.top);
							}
	
							looking = false;
						},		
					
					// CX_UL675A:
						__nothing,
					// CX_UL675B:
						__nothing,
					// CX_UR675A:
						__nothing,
					// CX_UR675B:
						__nothing,
					// CX_LL675A:
						__nothing,
					// CX_LL675B:
						__nothing,
					// CX_LR675A:
						__nothing,
					// CX_LR675B:
						__nothing,
						
					// CX_SOFTLF:
						__nothing,
					// CX_SOFTRT:
						__nothing,
					// CX_SOFTUP:
						__nothing,
					// CX_SOFTDN:
						function () { // void {
							thisoY = ((y1 & c$.XSubmapModel.CX_TILE_HEIGHT_UNMASK) + c$.XSubmapModel.CX_TILE_HEIGHT - this.m_cx.top);
							
							looking = false;
						}
				])[cx] ();
				
				if (collided) {
					return true;
				}
			}
			
//------------------------------------------------------------------------------------------
// bottom
//------------------------------------------------------------------------------------------
			x1 = Math.floor (this.oX) + this.m_cx.left;
			x2 = Math.floor (this.oX) + this.m_cx.right;
			y1 = Math.floor (this.oY) + this.m_cx.top;
			y2 = Math.floor (this.oY) + this.m_cx.bottom;
			
			looking = true;
			
			while (looking) {
				c = x1/this.m_submapWidth;
				r = y2/this.m_submapHeight;
				i = (Math.floor ((y2 & this.m_submapHeightMask)/c$.XSubmapModel.CX_TILE_HEIGHT) * this.m_cols) + Math.floor ((x1 & this.m_submapWidthMask)/c$.XSubmapModel.CX_TILE_WIDTH);
				cx = this.m_XSubmaps[r][c].cmap[i];
				if (cx >=0 && cx < c$.XSubmapModel.CX_MAX)
				([
					// CX_EMPTY:
						__nothing,
					// CX_SOLID:
						__nothing,
					// CX_SOFT:
						function () { // void {
							y2 = (y2 & c$.XSubmapModel.CX_TILE_HEIGHT_UNMASK) - 1;
						},
					// CX_JUMP_THRU:
						__nothing,
						
					// CX_UL45:
						__nothing,
					// CX_UR45:
						function () { // void {	
							var __x /* Array */ = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
							
							var x15 /* Number */ = x1 & c$.XSubmapModel.CX_TILE_WIDTH_MASK;
							var y15 /* Number */ = y2 & XSubmapModel.CX_TILE_HEIGHT_MASK;

							if (y15 >= __x[x15]) {
								this.oY = ((y2 & c$.XSubmapModel.CX_TILE_HEIGHT_UNMASK) + __x[x15] - this.m_cx.bottom - 1);
							}
	
							looking = false;
						},
					// CX_LL45:
						nothing,
					// CX_LR45:
						__nothing,
					
					// CX_UL225A:
						__nothing,
					// CX_UL225B:
						__nothing,
					// CX_UR225A:
						function () { // void {	
							var __xn /* Array */ = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];
							
							var x15 /* Number */ = x1 & c$.XSubmapModel.CX_TILE_WIDTH_MASK;
							var y15 /* Number */ = y2 & c$.XSubmapModel.CX_TILE_HEIGHT_MASK;

							if (y15 >= __x[x15]) {
								this.oY = ((y2 & c$.XSubmapModel.CX_TILE_HEIGHT_UNMASK) + __x[x15] - this.m_cx.bottom - 1);
							}
	
							looking = false;
						},
					// CX_UR225B:
						function () { // void {	
							var __x /* Array */ = [8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15];
							
							var x15 /* Number */ = x1 & c$.XSubmapModel.CX_TILE_WIDTH_MASK;
							var y15 /* Number */ = y2 & c$.XSubmapModel.CX_TILE_HEIGHT_MASK;

							if (y15 >= __x[x15]) {
								this.oY = ((y2 & c$.XSubmapModel.CX_TILE_HEIGHT_UNMASK) + __x[x15] - this.m_cx.bottom - 1);
							}
	
							looking = false;
						},
					// CX_LL225A:
						__nothing,
					// CX_LL225B:
						__nothing,
					// CX_LR225A:
						__nothing,
					// CX_LR225B:
						__nothing,
					
					// CX_UL675A:
						__nothing,
					// CX_UL675B:
						__nothing,
					// CX_UR675A:
						__nothing,
					// CX_UR675B:
						__nothing,
					// CX_LL675A:
						__nothing,
					// CX_LL675B:
						__nothing,
					// CX_LR675A:
						__nothing,
					// CX_LR675B:
						__nothing,
						
					// CX_SOFTLF:
						__nothing,
					// CX_SOFTRT:
						__nothing,
					// CX_SOFTUP:
							function () { // void {
								this.oY = ((y2 & c$.XSubmapModel.CX_TILE_HEIGHT_UNMASK) - (this.m_cx.bottom) - 1);
								
								looking = false;								
							},
					// CX_SOFTDN:
						__nothing,
				])[cx] ();
				
				if (collided) {
					return true;
				}
			}
			
//------------------------------------------------------------------------------------------
			function __nothing () { // void {
				looking = false;
			}
			
			return false;
		},
		
//==========================================================================================
$: function () {} }, // end methods

//==========================================================================================
accessors: {
//==========================================================================================

//------------------------------------------------------------------------------------------
	oDX: {
		get: function () {
			return this.getVel ().x;
		},
		
		set: function (__value) {
			var __vel /* XPoint */ = this.getVel ();
			__vel.x = __value;
			this.setVel (__vel);
		}
	},

//------------------------------------------------------------------------------------------
	oDY: {
		get: function () {
			return this.getVel ().y;
		},
		
		set: function (__value) {
			var __vel /* XPoint */ = this.getVel ();
			__vel.y = __value;
			this.setVel (__vel);
		}
	},
	
//------------------------------------------------------------------------------------------
	oldX: {
		get: function () {
			return this.getOld ().x;
		},
		
		set: function (__value) {
			var __pos /* XPoint */ = this.getOld ();
			__pos.x = __value;
			this.setOld (__pos);
		}
	},
	
//------------------------------------------------------------------------------------------
	oldY: {
		get: function () {
			return this.getOld ().y;
		},
		
		set: function (__value) {
			var __pos /* XPoint */ = this.getOld ();
			__pos.y = __value;
			this.setOld (__pos);
		}
	},
	
//------------------------------------------------------------------------------------------
	CX_Collide_Flag: {
		get: function () { // Number
			return this.m_CX_Collide_Flag;
		},
		
		set: function (__value) {
		}
	},
		
//------------------------------------------------------------------------------------------
	Ck_Slope_DN: function () { // Boolean {
		var x1, /* Number */ y1, /* Number */ x2, /* Number */ y2; /* Number */
		var i, /* Number */ __x, /* Number */ __y; /* Number */
		var collided; /* Boolean */
		var looking = true; /* Boolean */
		var cx; /* Number */
		var r, /* int */ c; /* int */
		
		collided = false;

//------------------------------------------------------------------------------------------
//left
//------------------------------------------------------------------------------------------
		x1 = Math.floor (this.oX) + this.m_cx.left;
		x2 = Math.floor (this.oX) + this.m_cx.right;
		y1 = Math.floor (this.oY) + this.m_cx.top;
		y2 = Math.floor (this.oY) + this.m_cx.bottom;
		
		looking = true;
		
		while (looking) {
			c = x1/this.m_submapWidth;
			r = y2/this.m_submapHeight;
			i = (Math.floor ((y2 & this.m_submapHeightMask)/c$.XSubmapModel.CX_TILE_HEIGHT) * this.m_cols) + Math.floor ((x1 & this.m_submapWidthMask)/c$.XSubmapModel.CX_TILE_WIDTH);
			cx = this.m_XSubmaps[r][c].cmap[i];
			if (cx >=0 && cx < c$.XSubmapModel.CX_MAX)
			([
				// CX_EMPTY:
					__nothing,
				// CX_SOLID:
					__nothing,
				// CX_SOFT:
					function () { // void {
						x1 = (x1 & c$.XSubmapModel.CX_TILE_WIDTH_UNMASK) + c$.XSubmapModel.CX_TILE_WIDTH;
					},
				// CX_JUMP_THRU:
					__nothing,
		
				// CX_UL45:
					__nothing,
				// CX_UR45:
					function () { // void {				
						var __y /* Array */ = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
						
						var x15 /* Number */ = x1 & c$.XSubmapModel.CX_TILE_WIDTH_MASK;
						var y15 /* Number */ = y2 & c$.XSubmapModel.CX_TILE_HEIGHT_MASK;
					
						if (x15 <= __y[y15]) {
							this.oX = ((x1 & c$.XSubmapModel.CX_TILE_WIDTH_UNMASK) + __y[y15] - this.m_cx.left);
						}

						looking = false;
					},
				// CX_LL45:
					nothing,
				// CX_LR45:
					__nothing,
				
				// CX_UL225A:
					__nothing,
				// CX_UL225B:
					__nothing,
				// CX_UR225A:
					function () { // void {				
						var __y /* Array */ = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];
						var __x /* Array */ = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32];
						
						var x15 /* Number */ = x1 & c$.XSubmapModel.CX_TILE_WIDTH_MASK;
						var y15 /* Number */ = y2 & c$.XSubmapModel.CX_TILE_HEIGHT_MASK;
					
						if (y15 >= __y[x15]) {
							this.oX = ((x1 & c$.XSubmapModel.CX_TILE_WIDTH_UNMASK) + __x[y15] - this.m_cx.left);
						}

						looking = false;
					},
				// CX_UR225B:
					function () { // void {				
						var __y /* Array */ = [8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15];
						var __x /* Array */ = [0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 6, 8, 10, 12, 14, 16];
						
						var x15 /* Number */ = x1 & c$.XSubmapModel.CX_TILE_WIDTH_MASK;
						var y15 /* Number */= y2 & c$.XSubmapModel.CX_TILE_HEIGHT_MASK;
					
						if (y15 >= __y[x15]) {
							this.oX = ((x1 & c$.XSubmapModel.CX_TILE_WIDTH_UNMASK) + __x[y15] - this.m_cx.left);
						}

						looking = false;
					},
				// CX_LL225A:
					__nothing,
				// CX_LL225B:
					__nothing,
				// CX_LR225A:
					__nothing,
				// CX_LR225B:
					__nothing,
				
				// CX_UL675A:
					__nothing,
				// CX_UL675B:
					__nothing,
				// CX_UR675A:
					__nothing,
				// CX_UR675B:
					__nothing,
				// CX_LL675A:
					__nothing,
				// CX_LL675B:
					__nothing,
				// CX_LR675A:
					__nothing,
				// CX_LR675B:
					__nothing,
					
				// CX_SOFTLF:
					__nothing,
				// CX_SOFTRT:
						function () { // void {
							this.m_CX_Collide_Flag |= c$.CX_COLLIDE_LF;
		
							this.oX = ((x1 & c$.XSubmapModel.CX_TILE_WIDTH_UNMASK) + c$.XSubmapModel.CX_TILE_WIDTH - this.m_cx.left);
			
							collided = true;
						},
				// CX_SOFTUP:
					__nothing,
				// CX_SOFTDN:
					__nothing,
			])[cx] ();
			
			if (collided) {
				return true;
			}
		}
		
//------------------------------------------------------------------------------------------
//right
//------------------------------------------------------------------------------------------
		x1 = Math.floor (this.oX) + this.m_cx.left;
		x2 = Math.floor (this.oX) + this.m_cx.right;
		y1 = Math.floor (this.oY) + this.m_cx.top;
		y2 = Math.floor (this.oY) + this.m_cx.bottom;
		
		looking = true;
		
		while (looking) {
			c = x2/this.m_submapWidth;
			r = y2/this.m_submapHeight;
			i = (Math.floor ((y2 & this.m_submapHeightMask)/c$.XSubmapModel.CX_TILE_HEIGHT) * this.m_cols) + Math.floor ((x2 & this.m_submapWidthMask)/c$.XSubmapModel.CX_TILE_WIDTH);
			cx = this.m_XSubmaps[r][c].cmap[i];
			if (cx >=0 && cx < c$.XSubmapModel.CX_MAX)
			([
				// CX_EMPTY:
					__nothing,
				// CX_SOLID:
					__nothing,
				// CX_SOFT:
					function () { // void {
						x2 = (x2 & c$.XSubmapModel.CX_TILE_WIDTH_UNMASK) - 1;
					},
				// CX_JUMP_THRU:
					__nothing,
		
				// CX_UL45:
					function () { // void {				
						var __y /* Array */ = [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
						
						var x15 /* Number */ = x2 & c$.XSubmapModel.CX_TILE_WIDTH_MASK;
						var y15 /* Number */ = y2 & c$.XSubmapModel.CX_TILE_HEIGHT_MASK;

						if (x15 >= __y[y15]) {
							this.oX = ((x2 & c$.XSubmapModel.CX_TILE_WIDTH_UNMASK) + __y[y15] - this.m_cx.right - 1);
						}

						looking = false;
					},
				// CX_UR45:
					__nothing,
				// CX_LL45:
					nothing,
				// CX_LR45:
					__nothing,
				
				// CX_UL225A:
					function () { // void {				
						var __y /* Array */ = [15, 15, 14, 14, 13, 13, 12, 12, 11, 11, 10, 10, 9, 9, 8, 8];
						var __x /* Array */ = [0, 0, 0, 0, 0, 0, 0, 0, 13, 11, 9, 7, 5, 3, 1, -1];   
						
						var x15 /* Number */ = x2 & c$.XSubmapModel.CX_TILE_WIDTH_MASK;
						var y15 /* Number */ = y2 & c$.XSubmapModel.CX_TILE_HEIGHT_MASK;

						if (y15 >= __y[x15]) {
							this.oX = ((x2 & c$.XSubmapModel.CX_TILE_WIDTH_UNMASK) + __x[y15] - this.m_cx.right - 1);
						}

						looking = false;
					},
				// CX_UL225B:
					function () { // void {				
						var __y /* Array */ = [7, 7, 6, 6, 5, 5, 4, 4, 3, 3, 2, 2, 1, 1, 0, 0];
						var __x /* Array */ = [13, 11, 9, 7, 5, 3, 1, -1, -3, -5, -7, -9, -11, -13, -15, -17];
						
						var x15 /* Number */ = x2 & c$.XSubmapModel.CX_TILE_WIDTH_MASK;
						var y15 /* Number */ = y2 & c$.XSubmapModel.CX_TILE_HEIGHT_MASK;

						if (y15 >= __y[x15]) {
							thisoX = ((x2 & c$.XSubmapModel.CX_TILE_WIDTH_UNMASK) + __x[y15] - this.m_cx.right - 1);
						}

						looking = false;
					},
				// CX_UR225A:
					__nothing,
				// CX_UR225B:
					__nothing,
				// CX_LL225A:
					__nothing,
				// CX_LL225B:
					__nothing,
				// CX_LR225A:
					__nothing,
				// CX_LR225B:
					__nothing,
				
				// CX_UL675A:
					__nothing,
				// CX_UL675B:
					__nothing,
				// CX_UR675A:
					__nothing,
				// CX_UR675B:
					__nothing,
				// CX_LL675A:
					__nothing,
				// CX_LL675B:
					__nothing,
				// CX_LR675A:
					__nothing,
				// CX_LR675B:
					__nothing,
					
				// CX_SOFTLF:
					function () { // void {
						this.m_CX_Collide_Flag |= c$.CX_COLLIDE_RT;
	
						this.oX = ((x2 & c$.XSubmapModel.CX_TILE_WIDTH_UNMASK) - (this.m_cx.right) - 1);
		
						collided = true;
					},
				// CX_SOFTRT:
					__nothing,
				// CX_SOFTUP:
					__nothing,
				// CX_SOFTDN:
					__nothing,
			])[cx] ();
			
			if (collided) {
				return true;
			}
		}
		
//------------------------------------------------------------------------------------------
		function __nothing () { // void {
			looking = false;
		}
		
		return false;		
	},
	
//------------------------------------------------------------------------------------------
	Ck_Slope_UP: function () { // Boolean {
		var x1, /* Number */ y1, /* Number */ x2, /* Number */ y2; /* Number */
		var i, /* Number */ __x, /* Number */ __y; /* Number */
		var collided; /* Boolean */
		var looking = true; /* Boolean */
		var cx; /* Number */
		var r, /* int */ c; /* int */
		
		collided = false;

//------------------------------------------------------------------------------------------
//left
//------------------------------------------------------------------------------------------
		x1 = Math.floor (this.oX) + this.m_cx.left;
		x2 = Math.floor (this.oX) + this.m_cx.right;
		y1 = Math.floor (this.oY) + this.m_cx.top;
		y2 = Math.floor (this.oY) + this.m_cx.bottom;
		
		looking = true;
		
		while (looking) {
			c = x1/this.m_submapWidth;
			r = y1/this.m_submapHeight;
			i = (Math.floor ((y1 & this.m_submapHeightMask)/c$.XSubmapModel.CX_TILE_HEIGHT) * this.m_cols) + Math.floor ((x1 & this.m_submapWidthMask)/c$.XSubmapModel.CX_TILE_WIDTH);
			cx = this.m_XSubmaps[r][c].cmap[i];
			if (cx >=0 && cx < c$.XSubmapModel.CX_MAX)
			([
				// CX_EMPTY:
					__nothing,
				// CX_SOLID:
					__nothing,
				// CX_SOFT:
					function () { // void {
						x1 = (x1 & c$.XSubmapModel.CX_TILE_WIDTH_UNMASK) + c$.XSubmapModel.CX_TILE_WIDTH;
					},
				// CX_JUMP_THRU:
					__nothing,
		
				// CX_UL45:
					__nothing,
				// CX_UR45:
					__nothing,
				// CX_LL45:
					__nothing,
				// CX_LR45:
					function () { // void {				
						var __y /* Array */ = [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
						
						var x15 /* Number */ = x1 & c$.XSubmapModel.CX_TILE_WIDTH_MASK;
						var y15 /* Number */ = y1 & c$.XSubmapModel.CX_TILE_HEIGHT_MASK;
					
						if (x15 <= __y[y15]) {
							this.oX = ((x1 & c$.XSubmapModel.CX_TILE_WIDTH_UNMASK) + __y[y15] - this.m_cx.left);
						}

						looking = false;
					},
				
				// CX_UL225A:
					__nothing,
				// CX_UL225B:
					__nothing,
				// CX_UR225A:
					__nothing,
				// CX_UR225B:
					__nothing,
				// CX_LL225A:
					__nothing,
				// CX_LL225B:
					__nothing,
				// CX_LR225A:
					function () { // void {								
						var __y /* Array */ = [15, 15, 14, 14, 13, 13, 12, 12, 11, 11, 10, 10, 9, 9, 8, 8];
						var __x /* Array */ = [32, 30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2];
						
						var x15 /* Number */ = x1 & c$.XSubmapModel.CX_TILE_WIDTH_MASK;
						var y15 /* Number */ = y1 & c$.XSubmapModel.CX_TILE_HEIGHT_MASK;
					
						if (y15 <= __y[x15]) {
							this.oX = ((x1 & c$.XSubmapModel.CX_TILE_WIDTH_UNMASK) + __x[y15] - this.m_cx.left);
						}

						looking = false;
					},
				// CX_LR225B:
					function () { // void {							
						var __y /* Array */ = [7, 7, 6, 6, 5, 5, 4, 4, 3, 3, 2, 2, 1, 1, 0, 0];
						var __x /* Array */ = [16, 14, 12, 10, 8, 6, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0];
												
						var x15 /* Number */ = x1 & c$.XSubmapModel.CX_TILE_WIDTH_MASK;
						var y15 /* Number */ = y1 & c$.XSubmapModel.CX_TILE_HEIGHT_MASK;
					
						if (y15 <= __y[x15]) {
							this.oX = ((x1 & c$>XSubmapModel.CX_TILE_WIDTH_UNMASK) + __x[y15] - this.m_cx.left);
						}

						looking = false;
					},
				
				// CX_UL675A:
					__nothing,
				// CX_UL675B:
					__nothing,
				// CX_UR675A:
					__nothing,
				// CX_UR675B:
					__nothing,
				// CX_LL675A:
					__nothing,
				// CX_LL675B:
					__nothing,
				// CX_LR675A:
					__nothing,
				// CX_LR675B:
					__nothing,
					
				// CX_SOFTLF:
					__nothing,
				// CX_SOFTRT:
						function () { // void {
							this.m_CX_Collide_Flag |= c$.CX_COLLIDE_LF;
		
							this.oX = ((x1 & c$.XSubmapModel.CX_TILE_WIDTH_UNMASK) + c$.XSubmapModel.CX_TILE_WIDTH - this.m_cx.left);
			
							collided = true;
						},
				// CX_SOFTUP:
					__nothing,
				// CX_SOFTDN:
					__nothing,
			])[cx] ();
			
			if (collided) {
				return true;
			}
		}
		
//------------------------------------------------------------------------------------------
//right
//------------------------------------------------------------------------------------------
		x1 = Math.floor (this.oX) + this.m_cx.left;
		x2 = Math.floor (this.oX) + this.m_cx.right;
		y1 = Math.floor (this.oY) + this.m_cx.top;
		y2 = Math.floor (this.oY) + this.m_cx.bottom;
		
		looking = true;
		
		while (looking) {
			c = x2/this.m_submapWidth;
			r = y1/this.m_submapHeight;
			i = (Math.floor ((y1 & this.m_submapHeightMask)/c$.XSubmapModel.CX_TILE_HEIGHT) * this.m_cols) + Math.floor ((x2 & this.m_submapWidthMask)/c$.XSubmapModel.CX_TILE_WIDTH);
			cx = this.m_XSubmaps[r][c].cmap[i];
			if (cx >=0 && cx < c$.XSubmapModel.CX_MAX)
			([
				// CX_EMPTY:
					__nothing,
				// CX_SOLID:
					__nothing,
				// CX_SOFT:
					function () { // void {
						x2 = (x2 & c$.XSubmapModel.CX_TILE_WIDTH_UNMASK) - 1;
					},
				// CX_JUMP_THRU:
					__nothing,
		
				// CX_UL45:
					__nothing,
				// CX_UR45:
					__nothing,
				// CX_LL45:
					function () { // void {				
						var __y /* Array */ = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
						
						var x15 /* Number */ = x2 & c$.XSubmapModel.CX_TILE_WIDTH_MASK;
						var y15 /* Number */ = y1 & c$.XSubmapModel.CX_TILE_HEIGHT_MASK;

						if (x15 >= __y[y15]) {
							this.oX = ((x2 & c$.XSubmapModel.CX_TILE_WIDTH_UNMASK) + __y[y15] - this.m_cx.right - 1);
						}

						looking = false;
					},
				// CX_LR45:
					__nothing,
				
				// CX_UL225A:
					__nothing,
				// CX_UL225B:
					__nothing,
				// CX_UR225A:
					__nothing,
				// CX_UR225B:
					__nothing,
				// CX_LL225A:
					function () { // void {					
						var __y /* Array */ = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];
						var __x /* Array */ = [0, 2, 4, 6, 8, 10, 12, 14, 0, 0, 0, 0, 0, 0, 0, 0];
						
						var x15 /* Number */ = x2 & c$.XSubmapModel.CX_TILE_WIDTH_MASK;
						var y15 /* Number */ = y1 & c$.XSubmapModel.CX_TILE_HEIGHT_MASK;

						if (y15 <= __y[x15]) {		
							this.oX = ((x2 & c$.SubmapModel.CX_TILE_WIDTH_UNMASK) + __x[y15] - this.m_cx.right - 1);
						}

						looking = false;
					},
				// CX_LL225B:
					function () { // void {				
						var __y /* Array */ = [8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15];
						var __x /* Array */ = [-16, -14, -12, -10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10, 12, 14];
						
						var x15 /* Number */ = x2 & c$.XSubmapModel.CX_TILE_WIDTH_MASK;
						var y15 /* Number */ = y1 & c$.XSubmapModel.CX_TILE_HEIGHT_MASK;

						if (y15 <= __y[x15]) {
							this.oX = ((x2 & c$.XSubmapModel.CX_TILE_WIDTH_UNMASK) + __x[y15] - this.m_cx.right - 1);
						}

						looking = false;
					},
				// CX_LR225A:
					__nothing,
				// CX_LR225B:
					__nothing,
				
				// CX_UL675A:
					__nothing,
				// CX_UL675B:
					__nothing,
				// CX_UR675A:
					__nothing,
				// CX_UR675B:
					__nothing,
				// CX_LL675A:
					__nothing,
				// CX_LL675B:
					__nothing,
				// CX_LR675A:
					__nothing,
				// CX_LR675B:
					__nothing,
					
				// CX_SOFTLF:
					function () { // void {
						this.m_CX_Collide_Flag |= c$.CX_COLLIDE_RT;
	
						this.oX = ((x2 & c$.XSubmapModel.CX_TILE_WIDTH_UNMASK) - (this.m_cx.right) - 1);
		
						collided = true;
					},
				// CX_SOFTRT:
					__nothing,
				// CX_SOFTUP:
					__nothing,
				// CX_SOFTDN:
					__nothing,
			])[cx] ();
			
			if (collided) {
				return true;
			}
		}
		
//------------------------------------------------------------------------------------------
		function __nothing () { // void {
			looking = false;
		}
		
		return false;		
	},
	
//------------------------------------------------------------------------------------------
	nothing: function () { // void {
	},
	
//==========================================================================================
$: {} }, // end accessors

//==========================================================================================
statics: {
//==========================================================================================
	CX_COLLIDE_LF: 0x0001,										// Number = 0x0001;
	CX_COLLIDE_RT: 0x0002,										// Number = 0x0002;
	CX_COLLIDE_HORZ: (c$.CX_COLLIDE_LF+c$.CX_COLLIDE_RT),		// Number = (CX_COLLIDE_LF+CX_COLLIDE_RT); 
	CX_COLLIDE_UP: 0x0004,										// Number = 0x0004;
	CX_COLLIDE_DN: 0x0008,										// Number = 0x0008;
	CX_COLLIDE_VERT: (c$.CX_COLLIDE_UP+c$.CX_COLLIDE_DN),		// Number = (CX_COLLIDE_UP+CX_COLLIDE_DN);	
	
//==========================================================================================
$: function () {} }, // end statics

//==========================================================================================
end: []
//==========================================================================================
	});
			
//==========================================================================================
}());