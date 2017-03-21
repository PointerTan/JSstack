"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var robot = function robot() {
    var foodcaneat = function foodcaneat(food) {
        return food === "hamburger" || food === "water";
    };

    return {

        sayHello: function sayHello(_) {
            var sentence = 'I am a robot, my name is robotA';
            // console.log(sentence)
            return sentence;
        },

        sayHelloTo: function sayHelloTo(name) {
            return {
                string: "hello",
                target: name
            };
        },

        eat: function eat(food) {
            return foodcaneat(food);
        }

    };
};

exports.default = robot;

//robot 

//可重复
//快速
//有意义的行为描述
//信息明确的