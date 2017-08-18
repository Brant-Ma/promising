# Promising

[![Build Status](https://travis-ci.org/Brant-Ma/promising.svg?branch=master)](https://travis-ci.org/Brant-Ma/promising)

> You are promising!


## Introduction

<a href="http://promisesaplus.com/">
    <img src="http://promisesaplus.com/assets/logo-small.png" alt="Promises/A+ logo"
         title="Promises/A+ 1.1 compliant" align="right" />
</a>

Promising is a simple and tiny implementation of [Promises/A+](http://promisesaplus.com/) specification. The standard tries to focus on providing an `then` method, by which we can interact with a promise. So it does not involve how to create, fulfill or reject a promise.

## Can I use it?

As it does not provides other useful features, and ES6 has already embrace the native Promise object, **you should not use it**.

Just have fun trying it out, or reading the source code for the detail.

## Usage

```javascript
const { Promising } = require('../dist/promising')

let p = new Promising((resolve, reject) => {
  setTimeout(() => {
    resolve('Hi, you are promising!')
  })
})

p.then((value) => {
  console.log(value)
}).catch((reason) => {
  console.log(reason)
})
```



## License

The MIT License (MIT)
