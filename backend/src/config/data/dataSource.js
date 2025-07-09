const typeorm = require('typeorm')
const env = require('../environment')
const entities = require('./entities')

const dataSource = new typeorm.DataSource({
  type: env.DB_TYPE,
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: false,
  logging: false,
  entities,
  migrations: ['src/migration/**/*.js']
})

module.exports = dataSource
