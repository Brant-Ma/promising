/**
 * Implementation of Promises/A+ (https://promisesaplus.com/)
 */

// state enumeration (2.1 Promise States)
const States = { pending: 0, fulfilled: 1, rejected: 2 }
Object.freeze(States)

// private identifier
const _transition = Symbol('transition')
const _resolve = Symbol('resolve')
const _reject = Symbol('reject')

// helpers
const isType = (obj, type) => {
  let result = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
  return result === type.toLowerCase()
}

// Promising class
class Promising {
  constructor(executor) {
    this.state = States.pending
    this.value = undefined
    this.callbacks = []
    const resolve = (value) => { this[_transition](States.fulfilled, value) }
    const reject = (reason) => { this[_transition](States.rejected, reason) }
    if (isType(executor, 'function')) executor(resolve, reject)
  }

  // transition pending state to a resolved state, and call the callbacks
  [_transition](state, value) {
    if (this.state === States.pending) {  // 2.1.1 & 2.1.2 & 2.1.3 transition only when pending
      this.state = state
      this.value = value
      this.callbacks.forEach(cb => cb())
    }
  }

  [_resolve](value) {
    this[_transition](States.fulfilled, value)
  }

  [_reject](reason) {
    this[_transition](States.rejected, reason)
  }

  static resolve(value) {
    return new Promising((resolve, reject) => {
      resolve(value)
    })
  }

  static reject(reason) {
    return new Promising((resolve, reject) => {
      reject(reason)
    })
  }

  // 2.2 The then Method
  then(onFulfilled, onRejected) {
    const anotherPromise =  new Promising((resolve, reject) => {
      // call the handler next tick (2.2.4)
      const schedule = () => {
        setTimeout(() => {
          // make sure handler called as function (2.2.5)
          if (!isType(onFulfilled, 'function')) onFulfilled = value => value
          if (!isType(onRejected, 'function')) onRejected = reason => { throw reason }
          // try the handler
          try {
            const flag = this.state === States.fulfilled // 2.2.2 & 2.2.3
            const x = flag ? onFulfilled(this.value) : onRejected(this.value)
            resolutionProcedure(anotherPromise, x)  // 2.2.7.1
          } catch (e) {
            anotherPromise[_reject](e)  // 2.2.7.2
          }
        })
      }
      // check whether the state has been resolved
      if (this.state !== States.pending) {
        schedule()
      } else {
        this.callbacks.push(schedule) // 2.2.6 then may be called multiple times
      }
    })
    // 2.2.7 then must return a promise
    return anotherPromise
  }

  // syntax sugar: a special then method, which has no onFulfilled handler
  catch(onRejected) {
    this.then(undefined, onRejected)
  }
}

// the promise resolution procedure
function resolutionProcedure (anotherPromise, x) {
  if (x === anotherPromise) {  // 2.3.1 if x is just the anotherPromise
    anotherPromise[_reject](new TypeError(x))
  } else if (x instanceof Promising) {  // 2.3.2 if x is a promise
    x.then(value => {
      resolutionProcedure(anotherPromise, value)
    }, reason => {
      anotherPromise[_reject](reason)
    })
  } else if (isType(x, 'object') || isType(x, 'function')) {  // 2.3.3 if x is an object or function
    let resolved = false
    try {
      let then = x.then
      if (isType(then, 'function')) {
        then.call(x, value => {
          if (!resolved) {
            resolutionProcedure(anotherPromise, value)
            resolved = true
          }
        }, reason => {
          if (!resolved) {
            anotherPromise[_reject](reason)
            resolved = true
          }
        })
      } else {
        anotherPromise[_resolve](x)
      }
    } catch (e) {
      if (!resolved) anotherPromise[_reject](e)
    }
  } else {  // 2.3.4
    anotherPromise[_resolve](x)
  }
}

export { Promising }
