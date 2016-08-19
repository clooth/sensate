/** @flow */
/** @module sensate/components/gateway */
import Enum from 'es6-enum'
import EventEmitter from 'eventemitter3'

/**
 * Events emitted by Gateways
 * @type {Enum}
 */
export const Event = Enum(
  /**
   * Gateway successfully connected to its service
   */
  'CONNECTED',
  /**
   * Gateway disconnected from its service
   */
  'DISCONNECTED',
  /**
   * Gateway errored in some way
   */
  'ERRORED',
  /**
   * Gateway is ready to accept data
   */
  'READY'
)

/**
 * The base class for all Gateway classes.
 */
export default class Gateway extends EventEmitter {
  /**
   * The configuration object for the gateway instance
   * @type {Object}
   */
  config: { [key: string]: any}

  /**
   * Create a new Gateway instance with given options
   * @param {object} config The config for the gateway
   */
  constructor (config: { [key: string]: any }) {
    super()
    this.config = config
  }

  /**
   * Connect the gateway to its service
   * NOTE: This is just a dummy connection.
   * @return {Promise<Gateway>} A Promise with the gateway after connection
   */
  connect (): Promise<Gateway> {
    return new Promise((resolve, reject) => {
      // Emit the connection event
      this.emit(Event.CONNECTED, this)
      // Emit the ready event
      this.emit(Event.READY, this)
      // Resolve the promise
      resolve(this)
    })
  }
}
