const { authService } = require('..//services/authService')

const signupUser = async (req, res, next) => {
  try {
    const newUser = await authService.signupUser(req.body)

    return res.status(201).json({
      message: 'Registration successful, please check your email to activate your account',
      user: newUser
    })
  } catch (error) {
    next(error)
  }
}

module.exports.authController = {
  signupUser
}
