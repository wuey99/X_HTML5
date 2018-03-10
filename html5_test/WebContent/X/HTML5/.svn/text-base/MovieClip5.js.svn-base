//==========================================================================================
(function() { var c$ = {__initializing__: false};
//==========================================================================================
var n$ = g$.namespace ("X.HTML5");
	
g$.import (
	function () {
		g$.import (c$, "X.Task.*");
		g$.import (c$, "X.Geom.*");
		g$.import (c$, "X.HTML5.*");
	}
);

//==========================================================================================
	g$.class (c$, n$, {

//==========================================================================================
	name: "MovieClip5", extend: c$.Sprite5, borrows: [],
//==========================================================================================

//==========================================================================================
	properties: {
//==========================================================================================
		m_frameNumber: 0,						// Number;
		m_displayFrameNumber: -1,				// Number;
		m_playSpeed: 0,							// Number;
		m_paused: false,						// Boolean;
		m_XTaskSubManager: null,				// XTaskSubManager;
		
//==========================================================================================
$: function () {} }, // end properties

//==========================================================================================
	construct:
//==========================================================================================
		function () {
			if (c$.__initializing__) return;
		
			c$.Sprite5.call (this);
			
			this.m_XTaskSubManager = new c$.XTaskSubManager (this.getXTaskManager ());
			
			this.m_playSpeed = 1.0;
			
			this.gotoAndPlay (1.0);
			
			this.addTask ([
				c$.XTask.LABEL, "loop",
					function () {
						if (!this.m_paused && this.m_image5 != null) {
							this.m_frameNumber = (this.m_frameNumber + this.m_playSpeed) % this.m_image5.numFrames;
							
							this.__updateDisplayFrameNumber ();
						}
					}.bind (this),
				
					c$.XTask.WAIT, 0x0400,
				
					c$.XTask.GOTO, "loop",
				
				c$.XTask.RETN,
			]);
		},

//==========================================================================================
	methods: {
//==========================================================================================

//------------------------------------------------------------------------------------------
		setup: function () { // void
		},
		
//------------------------------------------------------------------------------------------
		cleanup: function () { // void
			this.removeAllTasks ();
		},
		
//------------------------------------------------------------------------------------------
		getXTaskManager: function () { // XTaskManager
			return g$.XApp.getXTaskManager ();
		},
		
//------------------------------------------------------------------------------------------
		// __taskList:Array,
		//__findLabelsFlag:Boolean = true
		addTask: function (
			__taskList, /* Array */
			__findLabelsFlag /* Boolean = true */
			) { // XTask

			__findLabelsFlag = __findLabelsFlag ? __findLabelsFlag : true;
			
			var __task /* XTask */ = this.m_XTaskSubManager.addTask (__taskList, __findLabelsFlag);
			
			__task.setParent (this);
			
			return __task;
		},
		
//------------------------------------------------------------------------------------------
		// __task:XTask,
		// __taskList:Array,
		// __findLabelsFlag:Boolean = true
		changeTask: function (
			__task, /* XTask */
			__taskList, /* Array */
			__findLabelsFlag /* Boolean = true */
			) { // XTask
				
			__findLabelsFlag = __findLabelsFlag ? __findLabelsFlag : true;
			
			return this.m_XTaskSubManager.changeTask (__task, __taskList, __findLabelsFlag);
		},
		
//------------------------------------------------------------------------------------------
		// __task:XTask
		isTask: function (__task /* XTask */) { // Boolean
			return this.m_XTaskSubManager.isTask (__task);
		},		
		
//------------------------------------------------------------------------------------------
		// __task:XTask
		removeTask: function (__task /* XTask */) { // void
			this.m_XTaskSubManager.removeTask (__task);	
		},

//------------------------------------------------------------------------------------------
		removeAllTasks: function () { // void
			this.m_XTaskSubManager.removeAllTasks ();
		},
		
//------------------------------------------------------------------------------------------
		addEmptyTask: function () { // XTask
			return this.m_XTaskSubManager.addEmptyTask ();
		},
		
//------------------------------------------------------------------------------------------
		drawImage5: function (__context, /* Context2d */ __m /* XMatrix */) { // void	
			if (this.m_image5 != null && this.m_displayFrameNumber >= 0) {
				this.m_image5.drawImage (
					__context,
					Math.floor (this.m_displayFrameNumber)
				);
			}
		},
		
//------------------------------------------------------------------------------------------
		renderCache: function () { // void {
			var __context = this.cache.getContext ("2d");
			
			__context.clearRect (0, 0, this.cache.width, this.cache.height);
			
			this.drawImage5 (__context, null);
		},
		
//------------------------------------------------------------------------------------------
		gotoAndPlay: function (__frameNumber /* Number */) { // void
			this.m_frameNumber = __frameNumber;
			
			this.__updateDisplayFrameNumber ();
			
			this.m_paused = false;
		},

//------------------------------------------------------------------------------------------
		gotoAndStop: function (__frameNumber /* Number */) { // void
			this.m_frameNumber = __frameNumber;
			
			this.__updateDisplayFrameNumber ();
			
			this.m_paused = true;
		},

//------------------------------------------------------------------------------------------
		__updateDisplayFrameNumber: function () { // void {
			if (Math.floor (this.m_displayFrameNumber) != Math.floor (this.m_frameNumber)) {
				this.m_displayFrameNumber = this.m_frameNumber;
				
				if (this.m_image5 != null) {
					this.renderCache ();
				}
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