import { expect } from 'chai'
import Gateway, { Event } from '../lib/gateway'

describe('Gateway', () => {
  describe('Core', () => {
    it('should be initializable with options', () => {
      const gateway = new Gateway({
        optionOne: true,
        optionTwo: false,
        optionFoo: 123
      })

      expect(gateway.opts.optionOne).to.be.equal(true)
    })
  })

  describe('Events', () => {
    it('should ensure event matching', () => {
      const ev1 = Event.CONNECTED
      const ev2 = Event.DISCONNECTED
      const ev3 = Event.CONNECTED

      expect(ev1).to.not.equal(ev2)
      expect(ev1).to.equal(ev3)
    })
  })
})
