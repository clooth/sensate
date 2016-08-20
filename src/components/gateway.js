/** @flow */
/** @module sensate/components/gateway */
import Enum from 'es6-enum'
import EventEmitter from 'eventemitter3'
import request from 'request-promise-native'
import WebSocket from 'ws'
import logger from '../utils/logger'

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
  'READY',
  /**
   * Gateway successfully connected to its websocket
   */
  'WEBSOCKET_OPENED',
  /**
   * Gateway disconnected from its websocket
   */
  'WEBSOCKET_CLOSED',
  /**
   * Gateway received a message from its websocket
   */
  'WEBSOCKET_MESSAGE'
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
  constructor (config: ?{ [key: string]: any }) {
    super()
    this.config = config || {}
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

  /**
   * [uri description]
   * @type {[type]}
   */
  requestHTTP (uri: string, method: string, params: { [key: string]: any}): Promise<string> {
    const req = request({
      uri,
      method,
      ...params
    })

    return req.then(result => {
      try {
        return JSON.parse(result)
      } catch (error) {
        return result
      }
    })
  }

  /**
   * [uri description]
   * @type {[type]}
   */
  openWebSocket (uri: string): WebSocket {
    this.webSocket = new WebSocket(uri)

    this.webSocket.on('open', data => {
      this.emit(Event.WEBSOCKET_OPENED, data)
      logger.debug(`Websocket connection opened on ${this.constructor.name}`)
    })

    this.webSocket.on('close', data => {
      this.emit(Event.WEBSOCKET_CLOSED, data)
      logger.debug(`Websocket connection closed on ${this.constructor.name}`)
    })

    this.webSocket.on('error', data => {
      this.emit(Event.WEBSOCKET_ERROR, data)
      logger.debug(`Websocket connection failed with error`, data)
    })

    this.webSocket.on('message', data => {
      this.emit(Event.WEBSOCKET_MESSAGE, data)
      logger.debug(`Websocket connection closed on ${data}`)
    })

    return this.webSocket
  }

  /**
   * [message description]
   * @type {[type]}
   */
  sendWebSocketMessage (message: string): boolean {
    try {
      this.webSocket.send(message)
      return true
    } catch (error) {
      logger.error('Failed to send websocket message.', error)
      return false
    }
  }

  /**
   * Disconnect the gateway's websocket
   */
  closeWebSocket () {
    this.webSocket.close()
  }
}
