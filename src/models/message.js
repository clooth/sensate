/** @flow */
/** @module models/message */
import type Gateway from '../components/Gateway'
import type Channel from './channel'
import type User from './user'
import assert from 'assert'

/**
 * Represents a single message in Sensate
 */
class Message {
  /**
   * Unique identifier of the message
   * @type {string}
   */
  id: string

  /**
   * The content of the message
   * @type {string}
   */
  content: string

  /**
   * The time when the message was sent
   * @type {number}
   */
  timestamp: number

  /**
   * The gateway this message belongs to
   * @type {[type]}
   */
  gateway: Gateway

  /**
   * The author of the message
   */
  author: ?User

  /**
   * The channel the message was sent on
   * @type {Channel}
   */
  channel: ?Channel

  /**
   * Create a new Message
   */
  constructor (opts: { [key: string]: any }) {
    this.id = opts.id
    this.content = opts.content.trim()
    this.timestamp = opts.timestamp
    this.gateway = opts.gateway
    this.author = opts.author
    this.channel = opts.channel

    assert(this.id, 'Message identifier cannot be empty.')
    assert(this.content, 'Message content cannot be empty.')
    assert(this.timestamp, 'Message timestamp cannot be empty.')
    assert(this.gateway, 'Message gateway cannot be empty.')
  }

  /**
   * Reply to this message
   */
  reply (text: string): Promise<Gateway> {
    return this.gateway.replyToMessage(this, text)
  }
}

export default Message
