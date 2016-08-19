import { expect } from 'chai'
import { Event, Gateway } from '../../src'

describe('Gateway', () => {
  describe('Core', () => {
    it('should be initializable with options', () => {
      const gateway = new Gateway({
        optionOne: true,
        optionTwo: false,
        optionFoo: 123
      })

      expect(gateway.config.optionOne).to.be.equal(true)
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

    it('should return a promise of type GatewayType', () => {
      const gateway = new Gateway({
        value: true
      })

      return gateway.connect()
        .then(r => {
          expect(r).to.be.an.instanceof(Gateway)
        })
    })
  })
})
