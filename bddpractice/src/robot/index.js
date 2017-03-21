const robot = () => {
    const foodcaneat = (food) => {
        return food === "hamburger" || food === "water"
    }

    return {

        sayHello: _ => {
            const sentence = 'I am a robot, my name is robotA'
            // console.log(sentence)
            return sentence
        },

        sayHelloTo: (name) => {
            return {
                string: "hello",
                target: name
            }
        },

        eat: (food) => {
            return foodcaneat(food)
        }

    }
}



export default robot

//robot 

//可重复
//快速
//有意义的行为描述
//信息明确的