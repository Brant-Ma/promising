let test = require('promises-aplus-tests')
let { Promising } = require('../dist/promising')

let adapter = {
  deferred() {
    let promise, resolve, reject
    promise = new Promising((a, b) => {
      resolve = a
      reject = b
    })
    return { promise, resolve, reject }
  }
}

test(adapter, (err) => {
  console.log(err)
})
