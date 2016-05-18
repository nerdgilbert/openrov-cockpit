// Regex expressions for getting function parameters
var STRIP_COMMENTS 	= /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var ARGUMENT_NAMES 	= /([^\s,]+)/g;

function Interface( deps ) 
{
	var self = this;
	this.functions = {};
};

// TODO: Use ES6 default parameter for isDefault
Interface.prototype.AddMethod = function( name, func, isDefault )
{
	// TODO: Use symbols instead of property names
	func.oName = name;
	func.oIsDefault = isDefault;
	
	this.functions[ name ] = func;
}

// Creates a JSON string with function API
Interface.prototype.SerializeAPI = function()
{
	var self = this;
	
	var api = {};
	var functions = [];
	
	// Fill function array
	for( var prop in self.functions )
	{
		var obj = {};
		obj[ prop ] = GetParamNames( self.functions[ prop ] );
		functions.push( obj );
	}
	
	api[ "functions" ] = functions;
	
	// Return API as JSON object
	return JSON.stringify( api );
}

// Returns an array with the names of a functions parameters
function GetParamNames( func ) 
{
  var fnStr = func.toString().replace(STRIP_COMMENTS, '');
  var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  
  if( result === null )
  {
     result = [];
  }
  
  return result;
}

module.exports = Interface;