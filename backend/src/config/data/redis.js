const Redis = require('ioredis')
const env = require('../environment')

const redis = new Redis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  password: env.REDIS_PASSWORD,
  username: env.REDIS_USER,
  retryStrategy: (times) => {
    if (times >= 3) {
      return null
    }
    const delay = Math.min(times * 1000, 5000)
    return delay
  }
})

module.exports = redis
