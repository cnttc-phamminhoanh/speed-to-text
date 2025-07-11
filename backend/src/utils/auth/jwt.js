const jwt = require('jsonwebtoken')
const env = require('../../config/environment')

const generateActivationToken = (user_id) => {
  return jwt.sign(
    { user_id },
    env.JWT_SECRET_ACTIVATION_TOKEN,
    { expiresIn: '5m' }
  )
}

module.exports = {
  generateActivationToken
}
