//==========================================================================================
(function() { var c$ = {__initializing__: false};
//==========================================================================================
var n$ = g$.namespace ("X.World");
	
g$.import (
		function () {
			g$.import (c$, "X.Collections.*");
			g$.import (c$, "X.World.Sprite.*");
		}
	);

//==========================================================================================
	g$.class (c$, n$, {

//==========================================================================================
	name: "XSpriteLayer", extend: c$.XSprite, borrows: [],
//==========================================================================================

//==========================================================================================
	properties: {
//==========================================================================================
		m_XDepthSpriteMap: null,				// XDict;
	
		forceSort: false,						// Boolean
	
//==========================================================================================
$: function () {} }, // end properties

//==========================================================================================
	construct:
//==========================================================================================
		function () {
			if (c$.__initializing__) return;
		
			c$.XSprite.call (this);
			
			this.m_XDepthSpriteMap = new c$.XDict ();
			
			this.forceSort = false;
		},

//==========================================================================================
	methods: {
//==========================================================================================

//------------------------------------------------------------------------------------------
		// __xxx:XWorld
		setup: function (__xxx /* XWorld */) { // void
			this.xxx = __xxx;
		},
		
//------------------------------------------------------------------------------------------
		cleanup: function () { // void
		},
	
//------------------------------------------------------------------------------------------
		// __sprite:DisplayObject,
		// __depth:Number
		//__visible:Boolean = false
		addSprite: function (
			__sprite, /* DisplayObject */
			__depth, /* Number */
			__visible /* Boolean = false */
			) { // XDepthSprite {
				
			__visible = __visible ? __visible : false;
			
			var __depthSprite /* XDepthSprite */ =  new c$.XDepthSprite ();
			__depthSprite.addSprite (__sprite, __depth, this);
			__depthSprite.visible = __visible;
			__depthSprite.xxx = this.xxx;
			
			this.addChild (__depthSprite);
				
			this.m_XDepthSpriteMap.put (__depthSprite, 0);
			
			return __depthSprite;
		},
		
//------------------------------------------------------------------------------------------
		addDepthSprite: function (__depthSprite /* XDepthSprite */) { // XDepthSprite {
			this.addChild (__depthSprite);
				
			this.m_XDepthSpriteMap.put (__depthSprite, 0);
			
			return __depthSprite;
		},
		
//------------------------------------------------------------------------------------------
		// __depthSprite:Sprite
		removeSprite: function (__depthSprite /* Sprite */) { // void
			if (this.m_XDepthSpriteMap.exists (__depthSprite)) {
				this.removeChild (__depthSprite);
				
				this.m_XDepthSpriteMap.remove (__depthSprite);
			}
		},
		
//------------------------------------------------------------------------------------------	
		depthSort: function () { // void {
			var list /* Array */ = new Array ();
			
			this.m_XDepthSpriteMap.forEach (
				function (sprite) { // void 
					list.push (sprite);
				}
			);
		
			var i; /* Number */
			var d; /* Number */
			
			this.mergeSort (list, 0, list.length-1);
		
			d = this.numChildren-1;
			
			for (i=0; i<list.length; i++) {
				this.setChildIndex (list[i], d--);
			}
		},
		
//------------------------------------------------------------------------------------------
		// a:Array, left:int, right:in
		mergeSort: function (a, /* Array */ left, /* int */ right /* int */) { // void
			var center; /* int */
			
			if (left < right) {
				center = Math.floor ((left+right)/2);
				
				this.mergeSort (a, left, center);
				this.mergeSort (a, center+1, right);
				
				this.merge (a, left, center+1, right);
			}	
		},
		
//------------------------------------------------------------------------------------------
		// a:Array, leftPos:int, rightPos:int, rightEnd:int
		merge: function (a, /* Array */ leftPos, /* int */ rightPos, /* int */ rightEnd /* int */) { // void
			var leftEnd /* int */ = rightPos-1;
			var tmpPos /* int */ = leftPos;
			var numElements /* int */ = rightEnd - leftPos + 1;
			
			var tmpArray /* Array */ = new Array (a.length);
	
        	// Main loop
        	while (leftPos <= leftEnd && rightPos <= rightEnd) {
            	if (a[leftPos].depth2 > a[rightPos].depth2) {
                	tmpArray[tmpPos++] = a[leftPos++];
             	}
            	else
            	{
                	tmpArray[tmpPos++] = a[rightPos++];
             	}
        	}
        	
        	// Copy rest of first half
        	while (leftPos <= leftEnd) {
            	tmpArray[tmpPos++] = a[leftPos++];
        	}
        	
        	// Copy rest of right half
        	while (rightPos <= rightEnd) { 
            	tmpArray[tmpPos++] = a[rightPos++];
        	}
        	
        	// Copy tmpArray back
        	for (var i /* int */ = 0; i < numElements; i++, rightEnd--) {
            	a[rightEnd] = tmpArray[rightEnd];
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