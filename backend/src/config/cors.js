const env = require('./environment')
const HttpError = require('http-errors')

const WHITELIST_DOMAINS = require('../utils/constants')

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin && env.BUILD_MODE === 'development') {
      return callback(null, true)
    }

    if (WHITELIST_DOMAINS.includes(origin)) {
      return callback(null, true)
    }

    return callback(HttpError.Forbidden(`${origin} not allowed by our CORS Policy.`))
  },
  optionsSuccessStatus: 200,
  credentials: true
}

module.exports = corsOptions
