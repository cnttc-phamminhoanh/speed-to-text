const Joi = require('joi')

const signupUserDto = Joi.object({
  body: Joi.object({
    user_name: Joi.string()
      .min(3)
      .max(30)
      .pattern(new RegExp('^[a-zA-Z0-9]+$'))
      .message({
        'string.pattern.base': 'user_name cannot contain special characters'
      })
      .required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] }
      })
      .required(),
    password: Joi.string()
      .min(8)
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$'))
      .messages({
        'string.pattern.base': 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'
      })
      .required()
  })
}).unknown(true)

const activationDto = Joi.object({
  query: Joi.object({
    token: Joi.string()
      .pattern(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/)
      .message('Invalid activation token')
      .required()
  })
}).unknown(true)

module.exports = {
  signupUserDto,
  activationDto
}
