/** @flow */
/** @module utils/logger */
import Winston from 'winston'

let logger = null

/* istanbul ignore if */
if (process.env.NODE_ENV !== 'test') {
  logger = new Winston.Logger({
    transports: [
      new Winston.transports.Console({
        level: process.env.LOG_LEVEL || 'debug',
        handleExceptions: true,
        json: false,
        colorize: true
      })
    ]
  })
} else {
  logger = new Winston.Logger({
    transports: []
  })
}

export default logger
