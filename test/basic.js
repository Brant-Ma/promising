const { Promising } = require('../dist/promising')

// basic test
new Promising((resolve, reject) => {
  setTimeout(() => {
    resolve('Hi, you are promising!')
  })
}).then((value) => {
  console.log(value)
}).catch((reason) => {
  console.log(reason)
})
