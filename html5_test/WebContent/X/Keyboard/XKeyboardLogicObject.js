//==========================================================================================
(function() { var c$ = {__initializing__: false};
//==========================================================================================
var n$ = g$.namespace ("X.Keyboard");
	
g$.import (
		function () {
			g$.import (c$, "X.*");
			g$.import (c$, "X.Collections.*");
			g$.import (c$, "X.Task.*");
//			g$.import (c$, "X.World.Collision.*");
			g$.import (c$, "X.World.Logic.*");
			g$.import (c$, "X.World.Sprite.*");
		}
	);

//==========================================================================================
	g$.class (c$, n$, {

//==========================================================================================
	name: "XKeyboardLogicObject", extend: c$.XLogicObject, borrows: [],
//==========================================================================================

//==========================================================================================
	properties: {
//==========================================================================================
		m_focus: null,							// XTask;
		m_text: null,							// XTextSprite;
		m_keyCodes: null,						// XDict;
		
//==========================================================================================
$: function () {} }, // end properties

//==========================================================================================
	construct:
//==========================================================================================
		function () {
			if (c$.__initializing__) return;
		
			c$.XLogicObject.call (this);
			
			this.m_focus = null;
		
			this.m_keyCodes = new c$.XDict ();
		},

//==========================================================================================
	methods: {
//==========================================================================================

//------------------------------------------------------------------------------------------
		// __xxx:XWorld, args:Array
		setup: function (__xxx, /* XWorld */ args /* Array */) { // void
			c$.XLogicObject.prototype.setup.call (this,__xxx, args);
			
			this.createSprites ();
		},
		
//------------------------------------------------------------------------------------------
		setupX: function () { // void
		},

//------------------------------------------------------------------------------------------
		cleanup: function () { // void
			c$.XLogicObject.prototype.cleanup.call (thi);
		},
	
//------------------------------------------------------------------------------------------
// create sprites
//------------------------------------------------------------------------------------------
		createSprites: function () { // void
			this.m_text = new c$.XTextSprite ();
					
			this.addSpriteAt (this.m_text, 9999, 9999);
		},
				
//------------------------------------------------------------------------------------------
		grabFocus: function () { // void
			if (this.m_focus == null) {
//				stage.addEventListener (KeyboardEvent.KEY_DOWN, onKeyboardDown, true, 0, true);
//				stage.addEventListener (KeyboardEvent.KEY_UP, onKeyboardUp, true, 0, true);
//				stage.addEventListener (MouseEvent.MOUSE_DOWN, onMouseDown, true, 0, true);
//				stage.addEventListener (MouseEvent.MOUSE_MOVE, onMouseMove, true, 0, true);
								
				this.takeStageFocus ();
						
				this.m_focus = this.addTask ([
					c$.XTask.LABEL, "loop",
						c$.XTask.WAIT, 0x0100,
					
						function () { // void
							this.takeStageFocus ();
						},
					
						c$.XTask.GOTO, "loop",
					
						c$.XTask.RETN,
				]);
			}
		},
		
//------------------------------------------------------------------------------------------
		takeStageFocus: function () { // void
//			if (stage.focus != m_text.v) {
//				stage.focus = m_text.v;
//			}
		},
		
//------------------------------------------------------------------------------------------
		// e:MouseEvent
		onMouseDown: function (e /* MouseEvent */) { // void
			this.takeStageFocus ();
		},
		
//------------------------------------------------------------------------------------------
		// e:MouseEven
		onMouseMove: function (e /* MouseEvent */) { // void
			this.takeStageFocus ();
		},
		
//------------------------------------------------------------------------------------------
		releaseFocus: function () { // void
			if (this.m_focus != null) {
				this.removeTask (m_focus);
				
//				stage.removeEventListener (KeyboardEvent.KEY_DOWN, onKeyboardDown);
//				stage.removeEventListener (KeyboardEvent.KEY_UP, onKeyboardUp);
								
				this.m_focus = null;
			}
		},
		
//------------------------------------------------------------------------------------------
		// e:KeyboardEvent
		onKeyboardDown: function (e /* KeyboardEvent */) { // void
//			trace (": v:", e.keyCode);
			
			var __c /* uint */ = e.keyCode;
			
			this.m_keyCodes.put (__c, 1);
		},
		
//------------------------------------------------------------------------------------------
		// e:KeyboardEvent
		onKeyboardUp: function (e /* KeyboardEvent */) { // void
//			trace (": ^:", e.keyCode);
			
			var __c /* uint */ = e.keyCode;
			
			if (this.m_keyCodes.exists (__c)) {
				this.m_keyCodes.put (__c, 0);
			}
		},
		
//------------------------------------------------------------------------------------------
		// __c:uint
		getKeyCode: function (__c /* uint */) { // Boolean
			if (this.m_keyCodes.exists (__c)) {
				return this.m_keyCodes.get (__c) == 1;
			}
			else
			{
				return false;
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