"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.once = once;
exports.memoize = memoize;
exports.bind = bind;


var _ = {
  // ...
};

function once(functionA) {
  return function () {
    var i = null;
    return function () {
      if (!i) {
        i = functionA.apply(this, arguments);
        console.log(i);
      }
      return i;
    };
  }();
}

function memoize(functionA) {
  var tempNubs = Object();
  var functionB = function functionB(nub) {
    if (Array.isArray(nub)) {
      var key = nub[0];
      if (tempNubs.key === undefined) {
        tempNubs.key = functionA(nub[1]);
      }

      return [key, tempNubs.key];
    }

    if (!isNaN(nub)) {
      if (tempNubs.nub === undefined) {
        tempNubs.nub = functionA(nub);
      }

      return tempNubs.nub;
    }
  };

  return functionB;
}

function bind(functionA, context, a1, a2) {
  var functionB = function functionB() {
    var result = functionA.call(context);
    if (a1 !== undefined && a2 !== undefined) {
      var args = [].slice.call(arguments, 0);
      args.unshift(a2);
      args.unshift(a1);
      result = functionA.apply(context, args);
      return result;
    } else if (Array.isArray(result)) {
      result = functionA.apply(context, arguments);
      return result;
    } else {
      return result;
    }
  };

  return functionB;
}