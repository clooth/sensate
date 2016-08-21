/** @flow */
/** @module models/channel */
import type Message from './message'
import type User from './user'
import type Gateway from '../components/gateway'
import assert from 'assert'

/**
 * Represents a single channel / room in Sensate
 */
class Channel {
  /**
   * The unique identifier of the channel
   * @type {string}
   */
  id: string

  /**
   * The public name of the channel
   * @type {[type]}
   */
  name: string

  /**
   * The users in this channel
   * @type {Array<User>}
   */
  users: [User]

  /**
   * The messages sent on this channel
   * @type {Array<Message>}
   */
  messages: [Message]

  /**
   * The gateway this channel belongs to
   * @type {Gateway}
   */
  gateway: Gateway

  /**
   * Create a new Channel
   */
  constructor (opts: { [key: string]: any }) {
    this.id = opts.id
    this.name = opts.name
    this.gateway = opts.gateway
    this.users = opts.users || []
    this.messages = opts.messages || []

    assert(this.id, 'Channel identifier cannot be empty.')
    assert(this.name, 'Channel name cannot be empty.')
    assert(this.gateway, 'Channel gateway cannot be empty.')
  }

  /**
   * Send a message to this channel
   * @param {string} text The text message to send
   */
  sendMessage (text: string): Promise<Gateway> {
    return this.gateway.sendChannelMessage(this, text)
  }
}

export default Channel
