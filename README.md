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

*Promising* provides promise constructor and these instance/static methods:

- `Promising()`
- `Promising.resolve()`
- `Promising.reject()`
- `Promising.prototype.then()`
- `Promising.prototype.catch()`

*Promising* does **not** provide these static methods:

- `Promising.all()`
- `Promising.race()`

As it does not provide other useful features, and ES6 has already embrace the native Promise object, **you should not use it**. But you can read the source code for the detail:

- Implementation: [src/promising.js](https://github.com/Brant-Ma/promising/blob/master/src/promising.js)
- Testing helpers: [test/helper.js](https://github.com/Brant-Ma/promising/blob/master/test/helper.js)

:blush: Just have fun trying it out, maybe you will find something interesting! ([Releases](https://github.com/Brant-Ma/promising/releases))

## Usage

Here is a simple example (only in browser):

```javascript
let getURL = (url) => {
  return new Promising((resolve, reject) => {
    let req = new XMLHttpRequest()
    req.open('GET', url, true)
    // success handler
    req.onload = () => {
      let code = req.status
      if ((code >= 200 && code < 300) || code == 304) {
        resolve(req.responseText)
      } else {
        reject(req.statusText)
      }
    }
    // error handler
    req.onerror = () => {
      reject(Error(req.statusText))
    }
    req.send()
  })
}

let url = 'http://httpbin.org/get'

getURL(url).then((res) => {
  console.log(res)
}).catch((err) => {
  console.log(err)
})
```

Another example about how to use the helper with Mocha and Chai:

```javascript
// test.js
const { mayBeResolved, mayBeRejected } = require('./helper')

describe('testing static methods: ', () => {
  it('should be resolved', () => {
    mayBeResolved(Promising.resolve(42)).then((value) => {
      expect(value).to.equal(42)
    })
  })
  it('should be rejected', () => {
    mayBeRejected(Promising.reject('oops')).catch(reason => {
      expect(reason).to.equal('oops')
    })
  })
})
```

## License

The MIT License (MIT)
