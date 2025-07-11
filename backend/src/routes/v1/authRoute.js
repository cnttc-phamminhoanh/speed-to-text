const express = require('express')
const validateDto = require('../../validations/validationDto')
const { signupUserDto } = require('../../dto/authDto')
const { authController } = require('../../controllers/authController')

const Router = express.Router()

Router.route('/signup')
  .post(validateDto(signupUserDto), authController.signupUser)

module.exports = Router
