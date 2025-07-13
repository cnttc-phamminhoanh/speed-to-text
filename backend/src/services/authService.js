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
  password,
  ...data
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
    ...data,
    user_name,
    email,
    password_hash,
    is_active: false
  })

  const activationToken = generateActivationToken(newUser.user_id)

  await redis.set(`activation:${activationToken}`, newUser.user_id, 'EX', env.REDIS_ACTIVATION_TOKEN_DURATION)

  await sendActivationEmail(newUser.email, activationToken)

  delete newUser.password_hash
  delete newUser.refresh_token

  return newUser
}

const activateAccount = async ({ token }) => {
  const user_id = await redis.get(`activation:${token}`)

  if (!user_id) {
    throw HttpError.BadRequest('Activation token is invalid or expired')
  }

  const user = await userRepository.findOne({
    where: {
      user_id,
      is_active: false
    }
  })

  if (!user) {
    throw HttpError.BadRequest('User not found or already activated')
  }

  const last_activated_at = new Date()

  await userRepository.update(
    { user_id },
    {
      is_active: true,
      last_activated_at
    }
  )

  await redis.del(`activation:${token}`)

  return {
    ...user,
    is_active: true,
    last_activated_at
  }
}

const resendActivation = async ({ email }) => {
  const user = await userRepository.findOne({
    where: {
      email,
      is_active: false
    }
  })

  if (!user) {
    throw HttpError.BadRequest('Email does not exist or account has been activated')
  }

  const resendKey = `resend:${email}`
  const currentCount = await redis.incr(resendKey)

  if (currentCount === 1) {
    await redis.expire(resendKey, env.REDIS_EMAIL_RESEND_WINDOW)
  }

  if (currentCount > env.REDIS_EMAIL_RESEND_LIMIT) {
    throw HttpError.TooManyRequests(`Please wait ${env.REDIS_EMAIL_RESEND_WINDOW / 60} minutes before submitting your request`)
  }

  const activationToken = generateActivationToken(user.user_id)

  await redis.set(`activation:${activationToken}`, user.user_id, 'EX', env.REDIS_ACTIVATION_TOKEN_DURATION)

  await sendActivationEmail(email, activationToken)

  return {
    email,
    resend_count: currentCount
  }
}

module.exports.authService = {
  signupUser,
  activateAccount,
  resendActivation
}
