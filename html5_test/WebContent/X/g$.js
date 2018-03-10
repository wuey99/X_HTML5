//------------------------------------------------------------------------------------------
	function g$ () {
		this.setup ();
	}

//------------------------------------------------------------------------------------------
	g$.prototype.setup = function () {
		this.m_cachedImports = new Array ();
		
		g$.stage = null;
		g$.canvas = null;
		g$.context = null;
		g$.XApp = null;
		g$.pathSeperator = "/";
	};
	
//------------------------------------------------------------------------------------------
	g$.prototype.namespace = function (path) {
		var i;
		var paths = path.split (".");
		var ns = this;
		
		if (path.length) for (i=0; i<paths.length; i++) {
			var folder = paths[i];
			
			if (ns[folder] == undefined) {
				ns[folder] = {};
			}
			
			ns = ns[folder];
		}
		
		return ns;
	};
	
//------------------------------------------------------------------------------------------
	g$.prototype.import = function (owner, path) {
		var i;

		if (owner == undefined) {
			for (i=0; i<this.m_cachedImports.length; i++) {
				this.m_cachedImports[i] ();
			}
			
			this.m_cachedImports = new Array ();
			
			return;
		}
		
		if (owner instanceof Function) {
			this.m_cachedImports.push (owner);
			
			owner ();
			
			return;
		}
		
		var paths = path.split (".");
		var ns = this;
		var folder;
	
		if (path.length) for (i=0; i<paths.length; i++) {
			folder = paths[i];
			
			if (folder == "*" && i == paths.length-1) {
				var prop;
				
				for (prop in ns) {
					owner[prop] = ns[prop];
				}
			}
			else
			{
				if (ns[folder] == undefined) {
					throw (Error ("import path doesn't exist: " + path));
				}
			
				ns = ns[folder];
				
				if (i == paths.length-1) {
					owner[folder] = ns;
				}
			}
		}
	};
	
//------------------------------------------------------------------------------------------
	g$.prototype.class = function (c$, n$, data) {
//------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------
// get class name
//------------------------------------------------------------------------------------------
		var classname = data.name;
		
		g$.trace ("---------------------------------------");
		g$.trace (": creating class: ", classname);
		
//------------------------------------------------------------------------------------------
// copy properties in namespace to current classes
//------------------------------------------------------------------------------------------
		for (var p in n$) {
			c$[p] = n$[p];
		}

//------------------------------------------------------------------------------------------
// get superclass
//------------------------------------------------------------------------------------------
		var superclass = data.extend;
		
		if (!("extend" in data)) {
			superclass = Object;
		}
		if (superclass != undefined) {
			if (typeof superclass == "string") {
				superclass = c$[superclass];
			}
		}
		if (superclass == undefined) {
			throw (Error ("superclass " + data.extend + " does not exist for " + classname));
		}

//------------------------------------------------------------------------------------------
// set up the constructor
//------------------------------------------------------------------------------------------
		var constructor = data.construct || function () {};

//------------------------------------------------------------------------------------------
// Create the object that will become the prototype for our class.
//------------------------------------------------------------------------------------------
		c$.__initializing__ = true;
		
		var proto = new superclass ();
		
		c$.__initializing__ = false;
		
//------------------------------------------------------------------------------------------
// Delete any non-inherited properties of this new prototype object.
//------------------------------------------------------------------------------------------
		for (var p in proto) {
			if (proto.hasOwnProperty (p)) {
				delete proto[p];
			}
		}
		
//------------------------------------------------------------------------------------------
// Borrow methods from "mixin" classes by copying to our prototype.
//------------------------------------------------------------------------------------------
		var borrows;		

		if (!data.borrows) {
			borrows = [];
		}
		else if (data.borrows instanceof Array) {
			borrows = data.borrows;
		}
		else
		{
			borrows = [data.borrows];
		}
		
		for (var i = 0; i < borrows.length; i++) {
			c = borrows[i];
			
			if (typeof c == "string") {
				c = c$[c];
			}
			
			if (c == undefined) {
				throw (Error ("unable to mixin " + borrows[i] + " for " + classname));
			}
			
			for (var p in c.prototype) {
				proto[p] = c.prototype[p];
			}
			
			__setupAccessors (c.prototype.$accessors);
		}
		
//------------------------------------------------------------------------------------------
// copy methods from class template
//------------------------------------------------------------------------------------------
		var methods = data.methods || {};
		
		for (var p in methods) {
			proto[p] = methods[p];
		}
		
//------------------------------------------------------------------------------------------
// copy variable properties from class template
//------------------------------------------------------------------------------------------
		var properties = data.properties || {};
		
		for (var p in properties) {
			proto[p] = properties[p];
		}

//------------------------------------------------------------------------------------------
// accessors (getters/setters)
//------------------------------------------------------------------------------------------
		var accessors
				
		if (data.accessors) {
			accessors = data.accessors;
		}
		else
		{
			accessors = {};
		}
				
		__setupAccessors (accessors);
		
		function __setupAccessors (accessors) {
			proto.$accessors = {};
			
			for (var p in accessors) {
				proto.$accessors[p] = accessors[p];
			}
			
			if (Object.defineProperty != undefined) {
				for (var p in accessors) {
					if (p != "$") {
						Object.defineProperty (proto, p, accessors[p]);
					}
				}
			}
			else if (Object.__defineGetter__ != undefined) {
				for (var p in accessors) {
					if (p != "$") {
						proto.__defineGetter__ (p, accessors[p]["get"]);
						proto.__defineSetter__ (p, accessors[p]["set"]);
					}
				}
			}
			else
			{
				throw (Error ("Your browser does not support Javascript getter/setters."));
			}	
		}
		
//-----------------------------------------------------------------------------------------
		proto.constructor = constructor;
		
		proto.superclass = superclass;
		
		if (classname) {
			proto.classname = classname;
		}

//------------------------------------------------------------------------------------------
// provides
//------------------------------------------------------------------------------------------
		var provides;

		if (!data.provides) {
			provides = [];
		}
		else if (data.provides instanceof Array) {
			provides = data.provides;
		}
		else
		{
			provides = [data.provides];
		}
		
		for(var i = 0; i < provides.length; i++) {  // for each class
			var c = provides[i];
			for(var p in c.prototype) {   // for each property
				if (typeof c.prototype[p] != "function") continue;  // methods only
				if (p == "constructor" || p == "superclass") continue;
				// Check that we have a method with the same name and that
				// it has the same number of declared arguments.  If so, move on
				if (p in proto &&
					typeof proto[p] == "function" &&
					proto[p].length == c.prototype[p].length) continue;
				// Otherwise, throw an exception
				throw (Error("Class " + classname + " does not provide method "+ c.classname + "." + p));
			}
		}

//------------------------------------------------------------------------------------------
// copy the prototype into the constructor
//------------------------------------------------------------------------------------------
		constructor.prototype = proto;
		
//------------------------------------------------------------------------------------------
// statics
//------------------------------------------------------------------------------------------
		var statics = data.statics || {};
		
		for (var p in statics) {
			constructor[p] = data.statics[p];
		}

//------------------------------------------------------------------------------------------
// insert the constructor into the namespace
//------------------------------------------------------------------------------------------
		c$[classname] = constructor;
		n$[classname] = constructor;

//------------------------------------------------------------------------------------------
// return the constructor function
//------------------------------------------------------------------------------------------
		return constructor;
	};
	
//------------------------------------------------------------------------------------------
	g$.prototype.trace = function () {
		console.info.apply (console, arguments);
	};

//------------------------------------------------------------------------------------------
	g$.prototype.print = function () {
		console.info.apply (console, arguments);
	};
	
//------------------------------------------------------------------------------------------
	g$.prototype.httpRequest = function () {
		m_request = new XMLHttpRequest ();
		m_loadComplete = false;
		
		this.test = function () {
			g$.trace (": loadComplete: ", m_loadComplete);
		};
		
		this.connect = function (__method, __url, __vars, __callback) {
			__method.toUpperCase ();
			
			try {
				if (__method == "GET") {
					m_request.open (__method, __url + __vars, true);
				}
				
				m_request.send (null);
				
				m_request.onreadystatechange = function () {
					if (m_request.readyState == 4 && !m_loadComplete) {
						m_loadComplete = true;
						
						if (__callback != null) {
							__callback (m_request);
						}
					}
				};
			}
			catch (e) {
				throw (Error (e.message));
			}
		};
		
		return this;
	};

//------------------------------------------------------------------------------------------
	g$.prototype.format = function () {
		var s = "" + arguments[0];
	    var i = arguments.length;
	    
	    while (i-- > 1) {	
	    	s = s.replace (new RegExp ('\\{' + (i-1) + '\\}', 'gm'), arguments[i]);
	    }
	    
	    return s;
	};
	
//------------------------------------------------------------------------------------------
	g$.prototype.bind = function (that, owner) {
		return function () {
			that.apply (owner, arguments);
		};
	};

//------------------------------------------------------------------------------------------
	var g$ = new g$ ();
	g$.setup ();

//------------------------------------------------------------------------------------------
	Function.prototype.bind = function (owner) {
		var that = this;
		
		return function () {		
			that.apply (owner, arguments);
		};
	};
	
//------------------------------------------------------------------------------------------
//	for (p in this) {
//		g$.trace (": prop: ", p, typeof this[p]);
//	}
