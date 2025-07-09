/* eslint-disable no-console */
const express = require('express')
const cors = require('cors')
const HttpError = require('http-errors')
const env = require('./config/environment')
const corsOptions = require('./config/cors')
const errorHandlingMiddleware = require('./middleware/errorHandling')
const { CONNECT_DB, CLOSE_DB } = require('./config/data/database')

const START_SERVER = () => {
  const app = express()
  const hostname = env.APP_HOST
  const port = env.APP_PORT

  app.use(cors(corsOptions))
  app.use(express.json())

  app.use(() => {
    throw HttpError.NotFound('Route Not Found')
  })
  app.use(errorHandlingMiddleware)

  const server = app.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}/`)
  })

  const handleShutdown = async () => {
    await CLOSE_DB()
    server.close(() => {
      process.exit(0)
    })
  }
  process.on('SIGINT', handleShutdown)
  process.on('SIGTERM', handleShutdown)
}

(async () => {
  try {
    await CONNECT_DB()
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()
