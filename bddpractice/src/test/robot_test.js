import robot from "../robot"
import chai from 'chai'
chai.should()

console.log("================================")

describe("robot test", function() {
    let robotA
    before(function() {
        robotA = robot()
    })

    it("should sayHello", function() {
        robotA.should.have.property('sayHello')
        robotA.sayHello().should.be.a('string')
    })

    it("should sayHello to somebody", function() {
        robotA.should.have.property('sayHelloTo')
        robotA.sayHelloTo('dingfan').target.should.equal("dingfan")
    })

    it("only eat humburger and water", function() {
        robotA.eat().should.be.false
        robotA.eat('hamburger').should.be.true
        robotA.eat('water').should.be.true
        robotA.eat('asdf').should.be.false
    })


    

})