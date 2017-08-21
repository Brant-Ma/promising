let mayBeResolved = (p) => {
  if (typeof p.then !== 'function') {
    throw Error('It should be a Promise object')
  }
  return {
    catch() {
      throw Error('You should use `mayBeResolved.then()`')
    },
    then(f) {
      return p.then((value) => {
        f.call(p, value)
      }, (reason) => {
        throw Error('Expected promise to be resolved but it was rejected')
      })
    }
  }
}

let mayBeRejected = (p) => {
  if (typeof p.then !== 'function') {
    throw Error('It should be a Promise object')
  }
  return {
    then() {
      throw Error('You should use `mayBeRejected.throw()`')
    },
    catch(f) {
      return p.then((value) => {
        throw Error('Expected promise to be rejected but it was resolved')
      }, (reason) => {
        f.call(p, reason)
      })
    }
  }
}

module.exports = { mayBeResolved, mayBeRejected }
