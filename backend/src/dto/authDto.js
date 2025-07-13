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
      .required(),
    phone_number: Joi.string()
      .pattern(new RegExp('^[0-9]+$'))
      .min(10)
      .max(15)
      .messages({
        'string.pattern.base': 'Phone number must contain only digits',
        'string.min': 'Phone number must be at least 10 digits',
        'string.max': 'Phone number cannot exceed 15 digits'
      })
      .optional()
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

const resendActivationDto = Joi.object({
  body: Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] }
      })
      .required()
      .messages({
        'string.email': 'Invalid email',
        'any.required': 'Email is required'
      })
  })
}).unknown(true)

module.exports = {
  signupUserDto,
  activationDto,
  resendActivationDto
}
