//==========================================================================================
(function() { var c$ = {__initializing__: false};
//==========================================================================================
var n$ = g$.namespace ("X.Sound");
	
g$.import (
		function () {
			g$.import (c$, "X.Sound.*");
			g$.import (c$, "X.Collections.*");
			g$.import (c$, "X.Task.*");
			g$.import (c$, "X.*");
		}
	);

//==========================================================================================
	g$.class (c$, n$, {

//==========================================================================================
	name: "XSoundManager", extend: Object, borrows: [],
//==========================================================================================

//==========================================================================================
	properties: {
//==========================================================================================
		m_XApp: null,							// XApp;
		m_soundChannels: null,					// XDict;

	
//==========================================================================================
$: function () {} }, // end properties

//==========================================================================================
	construct:
//==========================================================================================
		// __XApp:XApp
		function (__XApp /* XApp */) {
			if (c$.__initializing__) return;
		
//			Object.call (this);
		
			this.m_XApp = __XApp;

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
				
//			var __soundChannel:SoundChannel = __sound.play ();
			var __guid /* Number */ = c$.g_GUID++;
//			m_soundChannels.put (__guid, __soundChannel);

			/*
			__soundChannel.addEventListener (
				Event.SOUND_COMPLETE,
						
				function (e:Event):void {
					if (__completeListener != null) {
						__completeListener ();
					}
					
					if (m_soundChannels.exists (__guid)) {
						m_soundChannels.remove (__guid);
					}
				}
			);
			*/
			
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
				var __soundChannel /* SoundChannel */ = this.m_soundChannels.get (__guid);
				this.__soundChannel.stop ();
				
				this.m_soundChannels.remove (__guid);
			}
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
		// __guid:Number
		getSoundChannel: function (__guid /* Number */) { // SoundChannel
			if (this.m_soundChannels.exists (__guid)) {
				return this.m_soundChannels.get (__guid);
			}
			else
			{
				return null;
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
		g_GUID: 0,								// Number = 0;
	
//==========================================================================================
$: function () {} }, // end statics

//==========================================================================================
end: []
//==========================================================================================
	});
			
//==========================================================================================
}());