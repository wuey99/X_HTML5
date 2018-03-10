//==========================================================================================
(function() { var c$ = {__initializing__: false};
//==========================================================================================
var n$ = g$.namespace ("X.Sound");

g$.import (
		function () {
			g$.import (c$, "X.Sound.*");
			g$.import (c$, "X.*");
			g$.import (c$, "X.Collections.*");
			g$.import (c$, "X.Task.*");
		}
	);

//==========================================================================================
	g$.class (c$, n$, {

//==========================================================================================
	name: "XSoundTaskManager", extend: c$.XTaskSubManager, borrows: [],
//==========================================================================================

//==========================================================================================
	properties: {
//==========================================================================================
		m_soundManager: null,						// XSoundManager;
		m_soundChannels: null,						// XDict;
	
//==========================================================================================
$: function () {} }, // end properties

//==========================================================================================
	construct:
//==========================================================================================
		// __manager:XTaskManager, __soundManager:XSoundManager
		function (__manager, /* XTaskManager */ __soundManager /* XSoundManager */) {
			if (c$.__initializing__) return;
		
			this.m_soundManager = __soundManager;
			
			c$.XTaskSubManager.call (this, __manager);
		
			this.m_soundChannels = new c$.XDict ();
		},

//==========================================================================================
	methods: {
//==========================================================================================

//------------------------------------------------------------------------------------------
		setup: function () { // void
		},
		
//------------------------------------------------------------------------------------------
		cleanup: function () { // void
			c$.XTaskSubManager.prototype.cleanup.call (this);
			
			this.removeAllSounds ();
		},
	
//------------------------------------------------------------------------------------------
		// __soundManager:XSoundManager
		setSoundManager: function (__soundManager /* XSoundManager */) { // void
			this.m_soundManager = __soundManager;
		},
		
//------------------------------------------------------------------------------------------
		// __sound:Sound,
		// __completeListener:Function = null
		replaceSound: function (
			__sound, /* Sound */
			__completeListener /* Function = null */
			) { // Number 
				
			__completeListener = __completeListener ? __completeListener : null;
			
			this.removeAllSounds ();
			
			return this.playSound (__sound, __completeListener);
		},
		
//------------------------------------------------------------------------------------------
		// __sound:Sound,
		// __completeListener:Function = null
		playSound: function (
			__sound, /* Sound */
			__completeListener /* Function = null */
			) { // Number
				
			__completeListener = __completeListener ? __completeListener : null;
			
			var __guid /* Number */ = this.m_soundManager.playSound (__sound, __complete.bind (this));
			
			this.m_soundChannels.put (__guid, 0);
			
			function __complete () { // void
				if (__completeListener != null) {
					__completeListener ();
				}
				
				this.m_soundChannels.remove (__guid);
			}
			
			return __guid;
		},
		
//------------------------------------------------------------------------------------------
		// __className:String,
		// __completeListener:Function = null
		playSoundFromClassName: function (
			__className, /* String */
			__completeListener /* Function = null */
			) { // Number
				
			return 0;
		},
		
//------------------------------------------------------------------------------------------
		// __guid:Number
		stopSound: function (__guid /* Number */) { // void
			this.removeSound (__guid);
		},
		
//------------------------------------------------------------------------------------------
		// __guid:Number
		removeSound: function (__guid /* Number */) { // void
			if (this.m_soundChannels.exists (__guid)) {
				this.m_soundChannels.remove (__guid);
			}
			
			this.m_soundManager.removeSound (__guid);
		},
		
//------------------------------------------------------------------------------------------
		removeAllSounds: function () { // void
			this.m_soundChannels.forEach (
				function (__guid) { // void
					this.removeSound (__guid /* as Number */);
				}.bind (this)
			);
		},

//------------------------------------------------------------------------------------------
		// __taskList:Array,
		// __findLabelsFlag:Boolean = true
		addTask: function (
			__taskList, /* Array */
			__findLabelsFlag /* Boolean = true */
			) { // XTask 

			__findLabelsFlag = __findLabelsFlag ? __findLabelsFlag : true;
			
			var __task /* XSoundTask */ = this.addXTask (new c$.XSoundTask (__taskList, __findLabelsFlag)); /* as XSoundTask */
			
			__task.setSoundManager (m_soundManager);
			
			return __task;
		},
		
//------------------------------------------------------------------------------------------
		// __taskList:Array,
		// __findLabelsFlag:Boolean = true
		replaceAllSoundTasks: function (
			__taskList, /* Array */
			__findLabelsFlag /* Boolean = true */
			) { // XTask
				
			__findLabelsFlag = __findLabelsFlag ? __findLabelsFlag : true;
			
			this.removeAllTasks ();
			
			return this.addSoundTask (__taskList, __findLabelsFlag);
		},
		
//------------------------------------------------------------------------------------------
		// __taskList:Array,
		// __findLabelsFlag:Boolean = true
		addSoundTask: function (
			__taskList, /* Array */
			__findLabelsFlag /* Boolean = true */
			) { // XTask
				
			__findLabelsFlag = __findLabelsFlag ? __findLabelsFlag : true;
			
			var __task /* XSoundTask */ = this.addXTask (new c$.XSoundTask (__taskList, __findLabelsFlag)); /* as XSoundTask */
			
			__task.setSoundManager (m_soundManager);
			
			return __task;
		},
		
//------------------------------------------------------------------------------------------
		// __oldTask:XTask,
		// __taskList:Array,
		// __findLabelsFlag:Boolean = true
		changeTask: function (
			__oldTask, /* XTask */
			__taskList, /* Array */
			__findLabelsFlag /* Boolean = true */
			) { // XTask
				
			__findLabelsFlag = __findLabelsFlag ? __findLabelsFlag : true;
			
			var __task /* XSoundTask */ = this.changeXTask (__oldTask, new c$.XSoundTask (__taskList, __findLabelsFlag)); /* as XSoundTask */
			
			return __task;
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