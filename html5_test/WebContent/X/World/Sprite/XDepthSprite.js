//==========================================================================================
(function() { var c$ = {__initializing__: false};
//==========================================================================================
var n$ = g$.namespace ("X.World.Sprite");

g$.import (
		function () {
			g$.import (c$, "X.World.*");
			g$.import (c$, "X.World.Sprite.*");
		}
	);

//==========================================================================================
	g$.class (c$, n$, {

//==========================================================================================
	name: "XDepthSprite", extend: c$.XSprite, borrows: [c$.XRegistration_impl],
//==========================================================================================

//==========================================================================================
	properties: {
//==========================================================================================
		m_depth: 0,						// Number;
		m_depth2: 0,					// Number;
		m_relativeDepthFlag: false,		// Boolean;
		m_sprite: null,					// DisplayObject; (Sprite5)
		x_layer: null,					// XSpriteLayer;
	
//==========================================================================================
$: function () {} }, // end properties

//==========================================================================================
	construct:
//==========================================================================================
		function () {
			if (c$.__initializing__) return;
		
			c$.XSprite.call (this);
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
		// __sprite:DisplayObject,
		// __depth:Number,
		// __layer:XSpriteLayer,
		// __relative:Boolean = false
		addSprite: function (
			__sprite,
			__depth,
			__layer,
			__relative
			){ // void
				
			__relative = __relative ? __relative : false;
					
			this.m_sprite = __sprite;
			this.x_layer = __layer;
			this.setDepth (__depth);

			this.childList.addChild (__sprite);
			this.visible = false;
			this.relativeDepthFlag = __relative;
		},
		
//------------------------------------------------------------------------------------------
		// __depth:Number
		setDepth: function (__depth) { // void
			this.m_depth = __depth;
			this.depth2 = __depth;
		},
		
//------------------------------------------------------------------------------------------	
		getDepth: function () { // Number
			return this.m_depth;
		},
		
//------------------------------------------------------------------------------------------
		// __relative:Boolean
		setRelativeDepthFlag: function (__relative) { // void
			this.m_relativeDepthFlag = __relative;
		},

//------------------------------------------------------------------------------------------
		getRelativeDepthFlag: function () { // Boolean
			return this.m_relativeDepthFlag;
		},
	
//==========================================================================================
$: function () {} }, // end methods

//==========================================================================================
accessors: {
//==========================================================================================
	
//------------------------------------------------------------------------------------------
		visible: {
			get: function () {
				return this.m_sprite.visible;
			},
			
			set: function (__visible) {
				this.superclass.visible = __visible;
				
				this.m_sprite.visible = __visible;
			}
		},

//------------------------------------------------------------------------------------------
		depth: {
			get: function () {
				return this.m_depth;
			},
			
			set: function (__value) {
				this.m_depth = __value;
				this.depth2 = __value;
			}
		},

//------------------------------------------------------------------------------------------
		relativeDepthFlag: {
			get: function () {
				return this.m_relativeDepthFlag;
			},
			
			set: function (__value) {
				this.m_relativeDepthFlag = __value;
			}
		},

//------------------------------------------------------------------------------------------
		depth2: {
			get: function () {
				return this.m_depth2;
			},
			
			set: function (__depth) {
				if (__depth != this.m_depth2) {
					this.m_depth2 = __depth;
					this.x_layer.forceSort = true;
				}
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