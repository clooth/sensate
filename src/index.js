/** @flow */
/** @module sensate */
import Gateway, { Event } from './components/gateway'
import logger from './utils/logger'

/**
 * Main entry point and handles gateways and events
 */
export default class Sensate {
  /**
   * The Gateway used by this instance
   * @type {Gateway}
   */
  gateway: Gateway

  /**
   * Create a new Sensate instance with a given Gateway
   * @param {Gateway} gateway The Gateway to use for connection
   */
  constructor (gateway: Gateway) {
    if (!gateway || gateway instanceof Gateway === false) {
      const error = `Invalid Gateway ${gateway.constructor.name} when initializing Sensate.`
      logger.error(error)
      throw new Error(error)
    }

    // Store gateway in the instance
    this.gateway = gateway
  }
}

/**
 * Export other components of the library
 */
export {
  Gateway,
  Event
}
