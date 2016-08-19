/** @module gateway */
import Enum from 'es6-enum'
import EventEmitter from 'eventemitter3'

/**
 * Possible events emitted by gateways
 * @type {Enum}
 */
export const Event = Enum(
  'CONNECTED',
  'DISCONNECTED',
  'ERRORED'
)

/**
 * Base class for all gateways to inherit from
 */
export default class Gateway extends EventEmitter {
  /**
   * Create a new Gateway instance with given options
   * @param {object} opts The options for the gateway
   */
  constructor (opts) {
    super()

    this.opts = opts
  }
}
