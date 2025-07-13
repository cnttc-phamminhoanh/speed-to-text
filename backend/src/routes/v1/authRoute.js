const express = require('express')
const validateDto = require('../../validations/validationDto')
const { signupUserDto, activationDto, resendActivationDto } = require('../../dto/authDto')
const { authController } = require('../../controllers/authController')

const Router = express.Router()

Router.route('/signup')
  .post(validateDto(signupUserDto), authController.signupUser)

Router.route('/activate')
  .get(validateDto(activationDto), authController.activateAccount)

Router.route('/resend-activation')
  .post(validateDto(resendActivationDto), authController.resendActivation)

module.exports = Router
