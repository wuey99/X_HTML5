//==========================================================================================
(function() { var c$ = {__initializing__: false};
//==========================================================================================
var n$ = g$.namespace ("X.World.UI");
	
g$.import (
		function () {
			g$.import ("X.*");
			g$.import ("X.Task.*");
			g$.import ("X.World.*");
			g$.import ("X.World.Collision.*");
			g$.import ("X.World.Logic.*");
			g$.import ("X.Signals.*");
			g$.import ("X.World.Sprite.XDepthSprite");
		}
	);

//==========================================================================================
	g$.class (c$, n$, {

//==========================================================================================
	name: "XButton", extend: c$.XLogicObject, borrows: [],
//==========================================================================================

//==========================================================================================
	properties: {
//==========================================================================================
		m_sprite: null,							// MovieClip;
		x_sprite: null,							// XDepthSprite;
		m_buttonClassName: "",					// String;
		m_mouseDownSignal: null,				// XSignal;
		m_mouseUpSignal: null,					// XSignal;
		m_mouseOutSignal: null,					// XSignal;
	
		NORMAL_STATE: 1,						// Number = 1;
		OVER_STATE: 2,							// Number = 2;
		DOWN_STATE: 3,							// Number = 3;
		SELECTED_STATE: 4,						// Number = 4;
		DISABLED_STATE: 5,						// Number = 5;
				
		m_label: 0,								// Number;
		m_currState: 0,							// Number;
		m_disabledFlag: false,					// Boolean;
	
		
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
			c$.XLogicObject.prototype.setup.call (this, __xxx, args);
			
			this.m_buttonClassName = args[0];

			this.m_mouseDownSignal = this.createXSignal ();	
			this.m_mouseOutSignal = this.createXSignal ();
			this.m_mouseUpSignal = createXSignal ();
			
			this.createSprites ();
			
//			mouseEnabled = true;
			
// TBD: HTML5 MovieClip
			this.m_sprite.mouseEnabled = true;
			
			this.m_disabledFlag = false;
			
			this.xxx.getXTaskManager ().addTask ([
				function () { // void {
// TBD: HTML5 MovieClip
//					m_sprite.addEventListener (MouseEvent.MOUSE_OVER, onMouseOver, false, 0, true);
//					m_sprite.addEventListener (MouseEvent.MOUSE_DOWN, onMouseDown, false, 0, true);
//					m_sprite.addEventListener (MouseEvent.MOUSE_MOVE, onMouseMove, false, 0, true);
//					m_sprite.addEventListener (MouseEvent.MOUSE_UP, onMouseUp, false, 0, true);
//					m_sprite.addEventListener (MouseEvent.MOUSE_OUT, onMouseOut, false, 0, true);
				},
				
				c$.XTask.RETN,
			]);
			
			this.__gotoState (this.getNormalState ());
			
			this.m_currState = this.getNormalState ()
		
			this.createHighlightTask ();	
		},
		
//------------------------------------------------------------------------------------------
		cleanup: function () { // void {
			c$.XLogicObject.prototype.cleanup (this);
		},
		

//------------------------------------------------------------------------------------------
		createHighlightTask: function () { // void {
			this.addTask ([
				c$.XTask.LABEL, "__loop",
					c$.XTask.WAIT, 0x0100,
							
					function () { // void {
						this.m_sprite.gotoAndStop (this.m_label);
					}.bind (this),
											
					c$.XTask.GOTO, "__loop",
			]);
		},
				
//------------------------------------------------------------------------------------------
		addMouseUpEventListener: function (func /* Function */) { // void {
			this.m_sprite.addEventListener (MouseEvent.MOUSE_UP, func, false, 0, true);
		},
		
//------------------------------------------------------------------------------------------		
		onMouseOver: function (e /* MouseEvent */) { // void {
			if (this.m_disabledFlag) {
				return;
			}
			
			this.__gotoState (this.OVER_STATE);
			
			this.m_currState = this.OVER_STATE;
		},
		
//------------------------------------------------------------------------------------------		
		onMouseDown: function (e /* MouseEvent */) { // void {
			if (this.m_disabledFlag) {
				return;
			}
			
			this.__gotoState (this.DOWN_STATE);	

			this.m_currState = this.DOWN_STATE;
			
			this.fireMouseDownSignal ();
		},
		
//------------------------------------------------------------------------------------------		
		onMouseUp: function (e /* MouseEvent */) { // void {
			if (this.m_disabledFlag) {
				return;
			}
						
			this.__gotoState (this.getNormalState ());
			
			this.m_currState = this.getNormalState ();
			
			this.fireMouseUpSignal ();
		},
		
//------------------------------------------------------------------------------------------		
		onMouseMove: function (e /* MouseEvent */) { // void {	
		},
		
//------------------------------------------------------------------------------------------		
		onMouseOut: function (e /* MouseEvent */) { // void {
			if (this.m_disabledFlag) {
				return;
			}
			
			this.__gotoState (this.getNormalState ());
			
			this.m_currState = this.getNormalState ();
			
			this.fireMouseOutSignal ();
		},
		
//------------------------------------------------------------------------------------------
		setNormalState: function () { // void {
			this.__gotoState (this.getNormalState ());
			
			this.m_currState = this.getNormalState ();		
		},
		
//------------------------------------------------------------------------------------------
		getNormalState: function () { // Number {
			return this.NORMAL_STATE;
		},
		
//------------------------------------------------------------------------------------------
		isDisabled: function () { // Boolean {
			return this.m_disabledFlag;
		},
		
//------------------------------------------------------------------------------------------
		setDisabled: function (__disabled /* Boolean */) { // void {
			if (__disabled) {
				this.__gotoState (this.DISABLED_STATE);
							
				this.m_disabledFlag = true;
			}
			else
			{
				this.setNormalState ();
				
				this.m_disabledFlag = false;
			}
		},
		
//------------------------------------------------------------------------------------------
		setValues: function () { // void {
			this.setRegistration (-this.getPos ().x, -this.getPos ().y);
		},
		
//------------------------------------------------------------------------------------------
// create sprites
//------------------------------------------------------------------------------------------
		createSprites: function () { // void {			
			this.m_sprite = new (this.xxx.getClass (this.m_buttonClassName)) ();
							
			this.x_sprite = this.addSpriteToHud (this.m_sprite);
					
			this.__gotoState (this.NORMAL_STATE);
					
			this.m_currState = this.getNormalState ();
					
			this.show ();
		},

//------------------------------------------------------------------------------------------
		__gotoState: function (__label /* Number */) { // void {
			this.m_label = __label;
		},
		
//------------------------------------------------------------------------------------------
		addMouseDownListener: function (__listener /* Function */) { // void {
			this.m_mouseDownSignal.addListener (__listener);
		},

//------------------------------------------------------------------------------------------
		fireMouseDownSignal: function () { // void {
			this.m_mouseDownSignal.fireSignal ();
		},
		
//------------------------------------------------------------------------------------------
		addMouseUpListener: function (__listener /* Function */) { // void {
			this.m_mouseUpSignal.addListener (__listener);
		},
		
//------------------------------------------------------------------------------------------
		fireMouseUpSignal: function () { // void {
			this.m_mouseUpSignal.fireSignal ();
		},

//------------------------------------------------------------------------------------------
		addMouseOutListener: function (__listener /* Function */) { // void {
			this.m_mouseOutSignal.addListener (__listener);
		},

//------------------------------------------------------------------------------------------
		fireMouseOutSignal: function () { // void {
			this.m_mouseOutSignal.fireSignal ();
		},
				
//------------------------------------------------------------------------------------------
		removeAllListeners: function () { // void {
			this.m_mouseUpSignal.removeAllListeners ();
			this.m_mouseOutSignal.removeAllListeners ();
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