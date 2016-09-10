function A() {
}

A.prototype.a = function() {
  return 1;
};

function B() {
}

B.prototype.b = function() {
  return 2;
};

function extend(child, parent) {
  child.prototype.__proto__ = parent.prototype;
  return child;
}

extend(B, A);
// B.prototype.__proto__ = A.prototype;

var b = new B();
console.log(b.b());
console.log(b.a());