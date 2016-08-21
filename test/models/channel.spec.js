/* eslint-env mocha */
import { expect } from 'chai'
import { Gateway, Channel } from '../../src'

describe('Channel', () => {
  it('validates required fields', () => {
    expect(testChannels.invalid1).to.throw(/identifier cannot be empty/)
    expect(testChannels.invalid2).to.throw(/name cannot be empty/)
    expect(testChannels.invalid3).to.throw(/gateway cannot be empty/)
    expect(testChannels.valid).to.not.throw
  })

  it('supports messaging', () => {
    const channel = testChannels.valid()
    const send = channel.sendMessage('test')

    return send.then(gateway => {
      expect(gateway).to.be.an.instanceof(Gateway)
    })
  })
})

const testChannels = {
  invalid1: () => new Channel({
    id: null,
    name: 'general',
    gateway: new Gateway()
  }),
  invalid2: () => new Channel({
    id: 'general',
    name: null,
    gateway: new Gateway()
  }),
  invalid3: () => new Channel({
    id: 'general',
    name: 'general',
    gateway: null
  }),
  valid: () => new Channel({
    id: 'general',
    name: 'general',
    gateway: new Gateway()
  })
}
