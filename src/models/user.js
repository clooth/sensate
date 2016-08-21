/** @flow */
/** @module models/user */
import type Gateway from '../components/gateway'
import assert from 'assert'

/**
 * Represents a single user in Sensate
 */
class User {
  /**
   * The unique identifier of the user
   * @type {string}
   */
  id: string

  /**
   * The public name of the user
   * @type {string}
   */
  name: string

  /**
   * The gateway this user belongs to
   * @type {Gateway}
   */
  gateway: Gateway

  /**
   * Create a new User
   */
  constructor (opts: { [key: string]: any }) {
    this.id = opts.id
    this.name = opts.name
    this.gateway = opts.gateway

    assert(this.id, 'User identifier cannot be empty.')
    assert(this.name, 'User name cannot be empty.')
    assert(this.gateway, 'User gateway cannot be empty.')
  }

  /**
   * Send a message to this user
   * @param {string} text The text message to send
   */
  sendMessage (text: string): Promise<Gateway> {
    return this.gateway.sendUserMessage(this, text)
  }
}

export default User
