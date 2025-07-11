const express = require('express')
const authRoutes = require('./authRoute')

const Router = express.Router()

Router.get('/', (req, res) => {
  res.status(200).json( {
    message: 'APIs V1 are ready to use'
  })
})

Router.use('/auth', authRoutes)

module.exports = Router
