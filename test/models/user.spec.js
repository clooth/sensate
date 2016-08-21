/* eslint-env mocha */
import { expect } from 'chai'
import { Gateway, User } from '../../src'

describe('User', () => {
  it('validates required fields', () => {
    expect(testUsers.invalid1).to.throw(/identifier cannot be empty/)
    expect(testUsers.invalid2).to.throw(/name cannot be empty/)
    expect(testUsers.invalid3).to.throw(/gateway cannot be empty/)
    expect(testUsers.valid).to.not.throw
  })

  it('supports messaging', () => {
    const user = testUsers.valid()
    const send = user.sendMessage('test')
    expect(send).to.be.an.instanceof(Promise)

    return send.then(gateway => {
      expect(gateway).to.be.an.instanceof(Gateway)
    })
  })
})

const testUsers = {
  invalid1: () => new User({
    id: null,
    name: 'joe',
    gateway: new Gateway()
  }),
  invalid2: () => new User({
    id: 'joe123',
    name: null,
    gateway: new Gateway()
  }),
  invalid3: () => new User({
    id: 'joe123',
    name: 'jode',
    gateway: null
  }),
  valid: () => new User({
    id: 'joe123',
    name: 'joe',
    gateway: new Gateway()
  })
}
