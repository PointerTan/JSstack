"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.once = once;
exports.timespend = timespend;
exports.flatten = flatten;
exports.memoize = memoize;
exports.bind = bind;

var _rxtest = require("./rxtest");

var _rxtest2 = _interopRequireDefault(_rxtest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_rxtest2.default.first();

var _ = {
  // ...
};

// const Y = (f) => 
// {
//   let a = (x => {
//     console.log(" " + x)
//     let b = f(v => x(x)(v))
//     return b
//   })
//   return a(x => f(v => x(x)(v)))
// }


// const factorial = Y(function (fac) {
//   return function (n) {
//     return (n == 0 ? 1 : n * fac(n - 1));
//   }
// });

// console.log(factorial(5))

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

// const callRight = (fn, ...args) =>
//   (...remainingArgs) =>
//     fn(...remainingArgs, ...args);

// const foldTreeWith = (fn, terminalValue, [first, ...rest]) =>
//   first === undefined
//     ? terminalValue
//     : Array.isArray(first)
//       ? fn(foldTreeWith(fn, terminalValue, first), foldTreeWith(fn, terminalValue, rest))
//       : fn(first, foldTreeWith(fn, terminalValue, rest));

// const foldTree = (tree) => callRight(foldTreeWith, tree);

// const sumFoldable = (folder) => folder((a, b) => a + b, 0);

// sumFoldable(foldTree([1, [4, [9, 16]], 25]))


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