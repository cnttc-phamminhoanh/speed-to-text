const bcrypt = require('bcrypt')
const HttpError = require('http-errors')
const env = require('../config/environment')
const User = require('../entities/user')
const dataSource = require('../config/data/dataSource')
const redis = require('../config/data/redis')
const { generateActivationToken } = require('../utils/auth/jwt')
const { sendActivationEmail } = require('./emailService')

const userRepository = dataSource.getRepository(User)

const signupUser = async ({
  user_name,
  email,
  password
}) => {

  const [existingUserByUserName, existingUserByEmail] = await Promise.all([
    userRepository.findOne({ where: { user_name } }),
    userRepository.findOne({ where: { email } })
  ])

  if (existingUserByUserName) {
    throw HttpError.BadRequest('user_name already exists')
  }

  if (existingUserByEmail) {
    throw HttpError.BadRequest('email already exists')
  }

  const password_hash = bcrypt.hashSync(password, parseInt(env.BCRYPT_SALT))

  const newUser = await userRepository.save({
    user_name,
    email,
    password_hash,
    is_active: false
  })

  const activationToken = generateActivationToken(newUser.user_id)

  await redis.set(`activation:${activationToken}`, newUser.user_id, 'EX', 300)

  await sendActivationEmail(newUser.email, activationToken)

  return newUser
}

module.exports.authService = {
  signupUser
}
