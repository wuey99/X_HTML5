//==========================================================================================
(function() { var c$ = {__initializing__: false};
//==========================================================================================
var n$ = g$.namespace ("$Main");
	
g$.import (
		function () {
			g$.import (c$, "$Main.*");
			g$.import (c$, "X.*");
			g$.import (c$, "X.HTML5.*");
			g$.import (c$, "X.World.*");
			g$.import (c$, "X.World.Logic.*");
			g$.import (c$, "X.World.Sprite.*");
			g$.import (c$, "X.Collections.*");
			g$.import (c$, "X.Geom.*");
			g$.import (c$, "X.Signals.*");
			g$.import (c$, "X.XML.*");
			g$.import (c$, "X.Task.*");
		}
	);

//==========================================================================================
	g$.class (c$, n$, {

//==========================================================================================
	name: "TestObjectX", extend: c$.XLogicObject, borrows: [],
//==========================================================================================

//==========================================================================================
	properties: {
//==========================================================================================
		m_sprite: null,					// MoveClip;
		x_sprite: null,					// XDepthSprite;
		
		m_name: null,					// String;
		
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

			g$.trace (": TextObjectX: setup: ", this);
			
			this.createSprites ();
			
			this.addTask ([
			    c$.XTask.WAIT, 0x0800,
			    
			    function () {
//			    	this.oX = 100;
//			    	this.oY = 100;
//			    	this.oRotation = 45.0;
			    }.bind (this),
			    
				c$.XTask.LABEL, "wait",
					c$.XTask.WAIT, 0x0200,
				
					function () {
//						this.oX++;
//						this.oRotation += 1.0;
					}.bind (this),
					
					c$.XTask.GOTO, "wait",
					
				c$.XTask.RETN,
			]);

			var __count = 0;
			
			this.addTask ([
				c$.XTask.LABEL, "wait",
					c$.XTask.WAIT, 0x4000,
							
					function () {
						g$.trace (": ", __count);
						
						__count++;
					}.bind (this),
								
					c$.XTask.GOTO, "wait",
								
				c$.XTask.RETN,
			]);		
		},
		
//------------------------------------------------------------------------------------------
		setupX: function () { // void
			c$.XLogicObject.prototype.setupX.call (this);
		},
		
//------------------------------------------------------------------------------------------
		cleanup: function () { // void
		},
	
//------------------------------------------------------------------------------------------
// create sprites
//------------------------------------------------------------------------------------------
		createSprites: function () { // void
			this.m_sprite = new (this.xxx.getClass ("Test:FighterClass")) ();
			this.x_sprite = this.addSpriteAt (this.m_sprite, 0, 0);

			this.m_sprite.addEventListener (
				c$.MouseEvent5.MOUSE_DOWN,
				
				function (e) {
					g$.trace (": mouseDownX: ", this.m_name, e.localX, e.localY, e.stageX, e.stageY);
				}.bind (this),
				
				true
			);
			
			this.m_sprite.addEventListener (
				c$.MouseEvent5.MOUSE_MOVE,
				
				function (e) {
//					g$.trace (": mouseMoveX: ", e.localX, e.localY);
				}.bind (this),
				
				true
			);
			
			this.show ();
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