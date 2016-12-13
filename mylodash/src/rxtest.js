import Rx from 'rx'

let logValue = (val) => { console.log(val) }

//Array, subscribe
Rx.Observable.from(['a', 'b', 'c'])
    .subscribe(
        function(x) { console.log('Next: ' + x) },
        function(err) { console.log('error: ', err) }
    )


var avg = Rx.Observable.interval(1000)
    .scan(function(prev, cur) {
        return {
            sum: prev.sum + cur,
            count: prev.count + 1
        }
    }, { sum: 0, count: 0 })
    .map(function(o) {
        console.log( `sum: ${o.sum}, count: ${o.count}` )
        return o.sum / o.count
    })

var subscription = avg.subscribe(logValue)




// let a = Rx.Observable.range(1, 3).map(function(i) {
//     return i * 2
// })

// let sumF = (sum, x) => sum + x

// a.subscribe(logValue)

// Rx.Observable.range(1, 5).reduce(sumF).subscribe(logValue)




// let a = Rx.Observable.interval(2000).map(function(i) {
//     return 'A' + i
// })

// let b = Rx.Observable.interval(1000).map(function(i) {
//     return 'B' + i
// })

// Rx.Observable.merge(a, b).subscribe(function(x) {
//     console.log(x)
// })

let rxtest = {
    first() {
        console.log("rxtest")
    }
}

export default rxtest