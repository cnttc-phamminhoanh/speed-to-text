const express = require('express')
const validateDto = require('../../validations/validationDto')
const { signupUserDto, activationDto } = require('../../dto/authDto')
const { authController } = require('../../controllers/authController')

const Router = express.Router()

Router.route('/signup')
  .post(validateDto(signupUserDto), authController.signupUser)

Router.route('/activate')
  .get(validateDto(activationDto), authController.activateAccount)

module.exports = Router
