
export function Class(impFunc, superClass) {
  var child = function() {};//{this.constructor = impFunc}

  for (var key in impFunc) {
      child.prototype[key] = impFunc[key];
  }

  if (superClass !== undefined) {
    child.prototype.__proto__ = superClass.prototype;
  } 

  if (superClass === undefined) {
    child.__super__ = Object;
  }
  else {
    child.__super__ = superClass;
  }

  child.prototype.super = function(functionName){
    var result = superClass.prototype[functionName];
    // console.log("all :", result);
    var args = [].slice.call(arguments, 1);
    return  result.apply(this, args);
  }; 

  return child; 
}