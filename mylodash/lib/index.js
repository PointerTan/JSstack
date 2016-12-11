"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.once = once;
exports.timespend = timespend;
exports.flatten = flatten;
exports.memoize = memoize;
exports.bind = bind;

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var _ = {
  // ...
};

var Y = function Y(f) {
  var a = function a(x) {
    console.log(" " + x);
    var b = f(function (v) {
      return x(x)(v);
    });
    return b;
  };
  return a(function (x) {
    return f(function (v) {
      return x(x)(v);
    });
  });
};

var factorial = Y(function (fac) {
  return function (n) {
    return n == 0 ? 1 : n * fac(n - 1);
  };
});

console.log(factorial(5));

function once(functionA) {
  var run = false,
      result = void 0;
  return function () {
    result = run ? result : (run = ture, result = functionA.apply(this, arguments));
    return result;
  };
}

function timespend(functionA, count) {
  return function () {
    var timeBefore = new Date().getTime();
    var result = functionA.apply(this, arguments);
    for (var i = 1; i < count; i++) {
      functionA.apply(this, arguments);
    }
    var timeAfter = new Date().getTime();
    console.log("alltime: " + (timeAfter - timeBefore));
    console.log((timeAfter - timeBefore) / count);
    return result;
  };
}

function flatten(arrayA) {

  var result = [];
  var flat = function flat(array) {
    if (array[0]) {
      Array.isArray(array[0]) ? (flat(array[0]), flat(array.pop())) : a;
    }
    array[0];
    // array.map(element => {Array.isArray(element) ? flat(element): result.push(element) })
    array.map(function (element) {
      if (Array.isArray(element)) {
        flat(element);
      } else {
        result.push(element);
      }
    });
  };
  flat(arrayA);
  return result;
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

var callRight = function callRight(fn) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, remainingArgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      remainingArgs[_key2] = arguments[_key2];
    }

    return fn.apply(undefined, remainingArgs.concat(args));
  };
};

var foldTreeWith = function foldTreeWith(fn, terminalValue, _ref) {
  var _ref2 = _toArray(_ref);

  var first = _ref2[0];

  var rest = _ref2.slice(1);

  return first === undefined ? terminalValue : Array.isArray(first) ? fn(foldTreeWith(fn, terminalValue, first), foldTreeWith(fn, terminalValue, rest)) : fn(first, foldTreeWith(fn, terminalValue, rest));
};

var foldTree = function foldTree(tree) {
  return callRight(foldTreeWith, tree);
};

var sumFoldable = function sumFoldable(folder) {
  return folder(function (a, b) {
    return a + b;
  }, 0);
};

sumFoldable(foldTree([1, [4, [9, 16]], 25]));

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