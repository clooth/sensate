/** @flow */
/** @module sensate/components/gateway */
import Enum from 'es6-enum'
import EventEmitter from 'eventemitter3'
import request from 'request-promise-native'
import WebSocket from 'ws'
import logger from '../utils/logger'
import { Channel, Message, User } from '../models'

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
   * Gateway received a message
   */
  'MESSAGE',
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
   * The channels the gateway is connected to
   * @type {Array<Channel>}
   */
  channels: [Channel]

  /**
   * The messages the gateway has received
   * @type {Array<Message>}
   */
  messages: [Message]

  /**
   * The users the gateway is aware of
   * @type {Array<User>}
   */
  users: [User]

  /**
   * Create a new Gateway
   * @param {object} config The configuration for the gateway
   */
  constructor (config: ?{ [key: string]: any }) {
    super()

    this.config = config || {}
    this.channels = []
    this.messages = []
    this.users = []
  }

  /**
   * Connect the gateway to its service
   * NOTE: Required method in all gateways.
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
   * Send a text message to a channel
   * @param {Channel} channel The channel to send the message to
   * @param {string}  text    The message to send
   * @return {Promise<Gateway>} A promise with the gateway that completes after message sent
   */
  sendChannelMessage (channel: Channel, text: string): Promise<Gateway> {
    return Promise.resolve(this)
  }

  /**
   * Send a text message to a user
   * @param {User}   user The user to send the message to
   * @param {string} text The message to send
   * @return {Promise<Gateway>} A promise with the gateway that completes after message sent
   */
  sendUserMessage (user: User, text: string): Promise<Gateway> {
    return Promise.resolve(this)
  }

  /**
   * Reply to a given message
   * @param {Message} message The message to reply to
   * @param {string}  text    The text to reply with
   * @return {Promise<Gateway>} A promise with the gateway that completes after message sent
   */
  replyToMessage (message: Message, text: string): Promise<Gateway> {
    return Promise.resolve(this)
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
