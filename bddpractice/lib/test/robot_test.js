"use strict";

var _robot = require("../robot");

var _robot2 = _interopRequireDefault(_robot);

var _chai = require("chai");

var _chai2 = _interopRequireDefault(_chai);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.should();

console.log("================================");

describe("robot test", function () {
    var robotA = void 0;
    before(function () {
        robotA = (0, _robot2.default)();
    });

    it("should sayHello", function () {
        robotA.should.have.property('sayHello');
        robotA.sayHello().should.be.a('string');
    });

    it("should sayHello to somebody", function () {
        robotA.should.have.property('sayHelloTo');
        robotA.sayHelloTo('dingfan').target.should.equal("dingfan");
    });

    it("only eat humburger and water", function () {
        robotA.eat().should.be.false;
        robotA.eat('hamburger').should.be.true;
        robotA.eat('water').should.be.true;
        robotA.eat('asdf').should.be.false;
    });
});