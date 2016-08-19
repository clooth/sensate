import { expect } from 'chai'
import Sensate, { Gateway } from '../lib'

describe('Sensate', () => {
  describe('initialization', () => {
    it('should prevent initializing without gateways', () => {
      expect(() => {
        return new Sensate()
      }).to.throw()
    })

    it('should prevent initializing with invalid gateways', () => {
      class Dummy { }

      expect(() => {
        return new Sensate(new Dummy())
      }).to.throw()
    })

    it('should initialize with valid gateways', () => {
      class ExampleGateway extends Gateway { }

      let gateway = new ExampleGateway({ value: true })
      let sensate = null

      expect(() => {
        sensate = new Sensate(gateway)
      }).to.not.throw(/invalid gateway/)

      expect(sensate.gateway).to.equal(gateway)
    })
  })
})
