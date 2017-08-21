const { mayBeResolved, mayBeRejected } = require('./helper')
const { Promising } = require('../dist/promising')
const { expect } = require('chai')

describe('🐸  constructor: ', () => {
  it('should return a resolved promise', () => {
    const p = new Promising((resolve, reject) => {
      setTimeout(() => {
        resolve(42)
      })
    })
    mayBeResolved(p).then((value) => {
      expect(value).to.equal(42)
    })
  })
  it('should return a rejected promise', () => {
    const p = new Promising((resolve, reject) => {
      setTimeout(() => {
        resolve('oops')
      })
    })
    mayBeRejected(p).catch((reason) => {
      expect(reason).to.equal('oops')
    })
  })
})

describe('🐸  static method: ', () => {
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
