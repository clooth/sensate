/* eslint-env mocha */
import { expect } from 'chai'
import { Gateway, Message } from '../../src'

describe('Message', () => {
  it('validates required fields', () => {
    expect(testMessages.invalid1).to.throw(/identifier cannot be empty/)
    expect(testMessages.invalid2).to.throw(/content cannot be empty/)
    expect(testMessages.invalid3).to.throw(/timestamp cannot be empty/)
    expect(testMessages.invalid4).to.throw(/gateway cannot be empty/)
    expect(testMessages.invalid5).to.throw(/content cannot be empty/)
    expect(testMessages.valid).to.not.throw
  })

  it('supports replies', () => {
    const message = testMessages.valid()
    const reply = message.reply('hello')
    expect(reply).to.be.an.instanceof(Promise)

    return reply.then(gateway => {
      expect(gateway).to.be.an.instanceof(Gateway)
    })
  })
})

const testMessages = {
  invalid1: () => new Message({
    id: null,
    content: 'hello',
    timestamp: +new Date(),
    gateway: new Gateway()
  }),
  invalid2: () => new Message({
    id: 'message1',
    content: '',
    timestamp: +new Date(),
    gateway: new Gateway()
  }),
  invalid3: () => new Message({
    id: 'message2',
    content: 'hello',
    timestamp: null,
    gateway: new Gateway()
  }),
  invalid4: () => new Message({
    id: 'message3',
    content: 'hello',
    timestamp: +new Date(),
    gateway: null
  }),
  invalid5: () => new Message({
    id: 'message4',
    content: ' ',
    timestamp: +new Date(),
    gateway: new Gateway()
  }),
  valid: () => new Message({
    id: 'message4',
    content: 'hello',
    timestamp: +new Date(),
    gateway: new Gateway()
  })
}
