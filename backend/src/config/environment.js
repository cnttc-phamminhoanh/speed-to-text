const path = require('path')

const buildMode = process.env.BUILD_MODE || 'development'

require('dotenv').config({
  path: path.join(__dirname, '..', '..', `.env.backend.${buildMode}`),
  override: true,
  debug: true
})

const env = {
  DB_TYPE: process.env.DB_TYPE,
  DB_PORT: process.env.DB_PORT,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  APP_PORT: process.env.APP_PORT,
  APP_HOST: process.env.APP_HOST,
  BUILD_MODE: process.env.BUILD_MODE,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_USER: process.env.REDIS_USER,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  JWT_SECRET_ACCESS_TOKEN: process.env.JWT_SECRET_ACCESS_TOKEN,
  JWT_SECRET_REFRESH_TOKEN: process.env.JWT_SECRET_REFRESH_TOKEN,
  GOOGLE_APP_USER: process.env.GOOGLE_APP_USER,
  GOOGLE_APP_PASSWORD: process.env.GOOGLE_APP_PASSWORD,
  BCRYPT_SALT: process.env.BCRYPT_SALT,
  APP_NAME: process.env.APP_NAME,
  JWT_SECRET_ACTIVATION_TOKEN: process.env.JWT_SECRET_ACTIVATION_TOKEN,
  APP_BASE_URL: process.env.APP_BASE_URL
}

module.exports = env
