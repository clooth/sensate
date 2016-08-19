/** @module sensate */
import Gateway, { Event } from './gateway'
import logger from './utils/logger'

/**
 * Main entry point and handles gateways and events
 */
export default class Sensate {
  /**
   * Create a new Sensate instance with a given Gateway
   * @param {Gateway} gateway The Gateway to use for connection
   */
  constructor (gateway) {
    if (!gateway || gateway instanceof Gateway === false) {
      const error = `Invalid Gateway ${gateway} when initializing Sensate.`
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
