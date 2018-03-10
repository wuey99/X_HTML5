//==========================================================================================
(function() { var c$ = {__initializing__: false};
//==========================================================================================
var n$ = g$.namespace ("X.Task");
	
g$.import (
	function () {
		g$.import (c$, "X.Task.*");
	}
);

//==========================================================================================
//XTask provides a mechanism to control the execution of functions.
//Functions can be queued up in an Array and executed at a later time.
//
//example of use:
//
//var taskList:Array = [
//	__moveUp,
//__moveDn,
//];
//
//xxx.getXTaskManager ().addTask (taskList);
//
//function __moveUp ():void;
//function __moveDn ():void;
//
//The execution of the queued functions can be manipulated several ways
//via the use of a rudimentary Scripting system.
//
//DELAYED EXECUTION:
//	XTask.WAIT, <ticks>
//
//var taskList:Array = [
//__moveUp,
//XTask.WAIT, 0x0400,
//__moveDn,
//];
//
//LOOPING:
//XTask.LOOP, <count>
//	<function>
//XTask.NEXT
//
//CALL/RETURN
//	XTask.CALL, <label>
//XTask.LABEL, "label"
//XTASK.RETN
//
//GOTO:
//XTask.GOTO, <label>
//
//some possible uses/applications of XTask:
//
//1) sequencing animation
//2) synchronizing the execution of code
//3) efficiently organizing operations that have to be executed in a particular order
//==========================================================================================
	g$.class (c$, n$, {

//==========================================================================================
	name: "XTask", extend: Object, borrows: [],
//==========================================================================================
		
//==========================================================================================
	properties: {
//==========================================================================================
		m_taskList: null,				// Array;
		m_taskIndex: 0,					// Number;
		m_labels: null,					// Object;
		m_ticks: 0,						// int
		m_stack: null,					// Array
		m_loop:	null,					// Array;
		m_stackPtr: 0,					// Number;
		m_parent: null,					// *;
		m_flags: 0,						// Number;
		m_subTask: null,				// XTask;	
		m_manager: null,				// XTaskManager;
		m_time: null,					// Number;
		m_WAIT1000: false,				// Boolean;
	
		m_XTaskSubManager: null,		// XTaskSubManager;
		
//==========================================================================================
$: function () {} }, // end properties

//==========================================================================================
	construct:
//==========================================================================================
		function (__taskList, __findLabelsFlag) {
			if (c$.__initializing__) return;
		
			__findLabelsFlag = __findLabelsFlag ? __findLabelsFlag : true;
			
//			Object.call (this);
			
			if (__taskList != undefined) {
				this.__reset (__taskList, __findLabelsFlag);
			}
			
			this.m_parent = null;
			
			m_WAIT1000 = false;
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
		__reset: function (__taskList, __findLabelsFlag) { // void
			__findLabelsFlag = __findLabelsFlag ? __findLabelsFlag : true;
			
			this.m_taskList = __taskList;
			this.m_taskIndex = 0;
			this.m_labels = new Object ();
			this.m_stack = new Array (8);
			this.m_loop = new Array (8);
			this.m_stackPtr = 0;
			this.m_ticks = 0x0100 + 0x0080;
			this.m_flags = ~c$.XTask.FLAGS_EQ;
			this.m_subTask = null;

			this.m_XTaskSubManager = this.createXTaskSubManager ();
			
// locate forward referenced labels.  this is usually done by default, but
// __findLabelsFlag can be set to false if it's known ahead of time that
// there aren't any forward referenced labels
			if (__findLabelsFlag) {
				this.__findLabels ();
			}
		},
		
//------------------------------------------------------------------------------------------
		createXTaskSubManager: function () { // XTaskSubManager
			return new c$.XTaskSubManager (null);
		},
		
//------------------------------------------------------------------------------------------
		getParent: function () { // *
			return this.m_parent;
		},
		
//------------------------------------------------------------------------------------------
		setParent: function (__parent) { // void
			this.m_parent = __parent;
		},
		
//------------------------------------------------------------------------------------------
		getManager: function () { // XTaskManager
			return this.m_manager;
		},
		
//------------------------------------------------------------------------------------------
		setManager: function (__manager) { // void
			this.m_manager = __manager;
			
			this.m_XTaskSubManager.setManager (__manager);
		},
		
//------------------------------------------------------------------------------------------
		kill: function () { // void
			this.removeAllTasks ();
		},
		
//------------------------------------------------------------------------------------------
// execute the XTask, usually called by the XTaskManager.
//------------------------------------------------------------------------------------------
		run: function  () { // void
// done execution?
			if (this.m_stackPtr < 0) {
				this.m_manager.removeTask (this);

				this.kill ();
						
				return;
			}
// suspended?
			this.m_ticks -= 0x0100;
						
			if (this.m_ticks > 0x0080) {
				return;
			}
// evaluate instructions
			var __cont = true;
				
			while (__cont) {
				__cont = this.__evalInstructions ();
			}
		},
		
//------------------------------------------------------------------------------------------
// locate all labels in an XTask
//------------------------------------------------------------------------------------------
		__findLabels: function () { // void
			var i;
			var x;
				
			i = 0;
				
			while (i < this.m_taskList.length) {
				var value = this.m_taskList[i++];
					
				if (value instanceof Function) {
				}
				else
				{
					x = value; /* as Number; */
						
					switch (x) {
						case c$.XTask.LABEL:
							var __label= this.m_taskList[i++]; // as String;	
								
//							trace (": new Label: ", __label);
								
							if (!(__label in this.m_labels)) {
									this.m_labels[__label] = i;
							}
							else
							{
								throw (Error ("duplicate label: " + __label));
							}
								
							break;	
								
						case c$.XTask.CALL:
							i++;
								
							break;
								
						case c$.XTask.RETN:
							break;
								
						case c$.XTask.LOOP:
							i++;
								
							break;
								
						case c$.XTask.NEXT:
							break;
								
						case c$.XTask.UNTIL:
							i++;
							
						case c$.XTask.WAIT:
							i++;
								
							break;
								
						case c$.WAIT1000:
							i++;
							
							break;
							
						case c$.XTask.GOTO:
							i++;
								
							break;
								
						case c$.XTask.BEQ:
							i++;
								
							break;
								
						case c$.XTask.BNE:
							i++;
								
							break;
								
						case c$.XTask.FLAGS:
							i++;
								
							break;
								
						case c$.XTask.EXEC:
							i++;
								
							break;
								
						case c$.XTask.FUNC:
							i++;
								
							break;
					}
				}
			}
		},
		
//------------------------------------------------------------------------------------------		
// evaluate instructions
//------------------------------------------------------------------------------------------	
		__evalInstructions: function () { // Boolean
				
			var value = this.m_taskList[this.m_taskIndex++];
						
//------------------------------------------------------------------------------------------
			if (value instanceof Function) {
					value ();
					
				return true;
			}
			
//------------------------------------------------------------------------------------------
			switch (value /* as Number */) {
//------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------
	case c$.XTask.LABEL:
//------------------------------------------------------------------------------------------
		var __label = this.m_taskList[this.m_taskIndex++];  /* as String; */
									
			if (!(__label in this.m_labels)) {
				this.m_labels[__label] = this.m_taskIndex;
			}
									
			break;
			
//------------------------------------------------------------------------------------------					
	case c$.XTask.WAIT:
//------------------------------------------------------------------------------------------
		var __ticks = this.__evalNumber ();
							
		this.m_ticks += __ticks;
									
		if (this.m_ticks > 0x0080) {
			return false;
		}
									
		break;
			
//------------------------------------------------------------------------------------------
	case c$.XTask.WAIT1000:
//------------------------------------------------------------------------------------------
		if (!this.m_WAIT1000) {
			this.m_time = this.m_XTaskSubManager.getManager ().getXApp ().getTime ();
			
			this.m_ticks += 0x0100;
			this.m_taskIndex--;
			
			this.m_WAIT1000 = true;
		}
		else
		{
			var __time = this.__evalNumber ();
			
			if (this.m_XTaskSubManager.getManager ().getXApp ().getTime () < this.m_time + __time) {
				this.m_ticks += 0x0100;
				this.m_taskIndex -= 2;
			}
			else
			{
				this.m_WAIT1000 = false;
				
				return true;
			}		
		}
		
		return false;
		
//------------------------------------------------------------------------------------------					
	case c$.XTask.LOOP:
//------------------------------------------------------------------------------------------
		var __loopCount = this.__evalNumber ();
				
		this.m_loop[this.m_stackPtr] = __loopCount;
		this.m_stack[this.m_stackPtr++] = this.m_taskIndex;
				
		break;

//------------------------------------------------------------------------------------------
	case c$.XTask.NEXT:
//------------------------------------------------------------------------------------------
//		trace (": ", m_loop[m_stackPtr-1]);
				
		this.m_loop[this.m_stackPtr-1]--;
				
		if (this.m_loop[this.m_stackPtr-1]) {	
			this.m_taskIndex = this.m_stack[this.m_stackPtr-1];
		}
		else
		{
			this.m_stackPtr--;
		}
					
		break;
					
//------------------------------------------------------------------------------------------
	case c$.XTask.UNTIL:
//------------------------------------------------------------------------------------------
		var __funcUntil = this.m_taskList[this.m_taskIndex++]; /* as Function; */
		
		__funcUntil (this);
		
		if (!(this.m_flags & FLAGS_EQ)) {	
			this.m_taskIndex = this.m_stack[this.m_stackPtr-1];
		}
		else
		{
			this.m_stackPtr--;
		}
			
		break;
		
//------------------------------------------------------------------------------------------					
	case c$.XTask.GOTO:
//------------------------------------------------------------------------------------------
		var __gotoLabel = this.m_taskList[this.m_taskIndex]; /* as String; */

		if (!(__gotoLabel in this.m_labels)) {
			throw (Error ("goto: unable to find label: " + __gotoLabel));
		}
				
		this.m_taskIndex = this.m_labels[__gotoLabel];
									
		break;
			
//------------------------------------------------------------------------------------------					
	case c$.XTask.CALL:
//------------------------------------------------------------------------------------------
		var __callLabel = this.m_taskList[this.m_taskIndex++]; /* as String; */
				
		this.m_stack[this.m_stackPtr++] = this.m_taskIndex;

		if (!(__callLabel in this.m_labels)) {
			throw (Error ("call: unable to find label: " + __callLabel));
		}
				
		this.m_taskIndex = this.m_labels[__callLabel];
				
		break;
			
//------------------------------------------------------------------------------------------					
	case c$.XTask.RETN:
//------------------------------------------------------------------------------------------					
		this.m_stackPtr--;
									
		if (this.m_stackPtr < 0) {
			return false;
		}
				
		this.m_taskIndex = this.m_stack[this.m_stackPtr];
									
		break;

//------------------------------------------------------------------------------------------
	case c$.XTask.BEQ:
		var __beqLabel = this.m_taskList[this.m_taskIndex++]; /* as String; */

		if (!(__beqLabel in this.m_labels)) {
			throw (Error ("goto: unable to find label: " + __beqLabel));
		}
				
		if (this.m_flags & c$.XTask.FLAGS_EQ) {
			this.m_taskIndex = this.m_labels[__beqLabel]
		}
										
		break;
				
//------------------------------------------------------------------------------------------
	case c$.XTask.BNE:
		var __bneLabel = this.m_taskList[this.m_taskIndex++]; /* as String; */

		if (!(__bneLabel in this.m_labels)) {
			throw (Error ("goto: unable to find label: " + __bneLabel));
		}
				
		if (!(this.m_flags & c$.XTask.FLAGS_EQ)) {
			this.m_taskIndex = this.m_labels[__bneLabel]
		}
										
		break;
								
//------------------------------------------------------------------------------------------
	case c$.XTask.FLAGS:
		var __funcFlags = this.m_taskList[this.m_taskIndex++]; /* as Function; */
				
		__funcFlags (this);
				
		break;

//------------------------------------------------------------------------------------------
	case c$.XTask.FUNC:
		var __funcTask = this.m_taskList[this.m_taskIndex++]; /* as Function; */
				
		__funcTask (this);
				
		break;
				
//------------------------------------------------------------------------------------------
// launch a sub-task and wait for it to finish before proceeding
//------------------------------------------------------------------------------------------
	case c$.XTask.EXEC:
		if (this.m_subTask == null) {
// get new XTask Array run it immediately
			this.m_subTask = this.m_manager.addTask ((this.m_taskList[this.m_taskIndex] /* as Array */), true);
			this.m_subTask.setParent (this.m_parent);
			this.m_subTask.run ();
					
// return back to the EXEC command and wait
			this.m_taskIndex--;
		}
		else
		{
// if the sub-task is still active, wait another tick and check again
			if (this.m_manager.isTask (this.m_subTask)) {
				this.m_ticks += 0x0100;
				this.m_taskIndex--;
				return false;
			}
// move along
			else
			{
				this.m_subTask = null;
				this.m_taskIndex++;
			}
		}
				
		break;
								
//------------------------------------------------------------------------------------------
// end switch
//------------------------------------------------------------------------------------------
	}

//------------------------------------------------------------------------------------------
// end evalInstructions
//------------------------------------------------------------------------------------------
		return true;
	},

//------------------------------------------------------------------------------------------
	setFlagsBool: function (__bool) { // void
		if (__bool) {
			this.setFlagsEQ ();
		}
		else
		{
			this.setFlagsNE ();
		}
	},
	
//------------------------------------------------------------------------------------------
	ifTrue: function (__bool) { // void
		if (__bool) {
			this.setFlagsEQ ();
		}
		else
		{
			this.setFlagsNE ();
		}
	},
	
//------------------------------------------------------------------------------------------
	setFlagsEQ: function  () { // void
		this.m_flags |= c$.XTask.FLAGS_EQ;
	},
	
//------------------------------------------------------------------------------------------
	setFlagsNE: function () { // void
		this.m_flags &= ~c$.XTask.FLAGS_EQ;
	},

//------------------------------------------------------------------------------------------
	__evalNumber: function () { // Number
		var x = this.m_taskList[this.m_taskIndex++];
		
		var type = typeof x;

		if (type == "number") {
			return x; /* as Number; */
		}

		if (x instanceof c$.XNumber) {
			return x.value;	/* XNumber (x).value; */
		}
		
		return 0;
	},

//------------------------------------------------------------------------------------------
	gotoTask: function (__taskList, __findLabelsFlag) { // void
		__findLabelsFlag = __findLabelsFlag ? __findLabelsFlag : false;
		
		this.kill ();
		
		this.__reset (__taskList, __findLabelsFlag);
		
		this.setManager (this.m_manager);
	},
	
//------------------------------------------------------------------------------------------
	addTask: function (
		__taskList,
		__findLabelsFlag
		) { // XTask
		
		__findLabelsFlag = __findLabelsFlag ? __findLabelsFlag : true;
		
		return this.m_XTaskSubManager.addTask (__taskList, __findLabelsFlag);
	},

//------------------------------------------------------------------------------------------
	changeTask: function (
		__task,
		__taskList,
		__findLabelsFlag
		) { // XTask
		
		__findLabelsFlag = __findLabelsFlag ? __findLabelsFlag : true;
		
		return this.m_XTaskSubManager.changeTask (__task, __taskList, __findLabelsFlag);
	},
	
//------------------------------------------------------------------------------------------
	isTask: function (__task) { // Boolean
		return m_XTaskSubManager.isTask (__task);
	},

//------------------------------------------------------------------------------------------
	removeTask: function (__task) { // void
		this.m_XTaskSubManager.removeTask (__task);	
	},

//------------------------------------------------------------------------------------------
	removeAllTasks: function () { // void
		this.m_XTaskSubManager.removeAllTasks ();
	},

//------------------------------------------------------------------------------------------
	getEmptyTask$: function () { // Array
		return this.m_XTaskSubManager.getEmptyTask$ ();
	},

//------------------------------------------------------------------------------------------
	gotoLogic: function (__logic) { // void
		this.m_XTaskSubManager.gotoLogic (__logic);
	},
	
//------------------------------------------------------------------------------------------
	addEmptyTask: function () { // XTask
		return this.m_XTaskSubManager.addEmptyTask ();
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
		CALL: 0,
		RETN: 1,
		LOOP: 2,
		NEXT: 3,
		WAIT: 4,
		LABEL: 5,
		GOTO:  6,
		BEQ: 7,
		BNE: 8,
		FLAGS: 9,
		EXEC: 10,
		FUNC: 11,
		WAIT1000: 12,
		UNTIL: 13,

		FLAGS_EQ: 1,
	
//==========================================================================================
$: function () {} }, // end statics

//==========================================================================================
end: []
//==========================================================================================
	});
			
//==========================================================================================
}());