const { authService } = require('..//services/authService')

const signupUser = async (req, res, next) => {
  try {
    const newUser = await authService.signupUser(req.validatedData.body)

    return res.status(201).json({
      message: 'Registration successful, please check your email to activate your account',
      user: newUser
    })
  } catch (error) {
    next(error)
  }
}

const activateAccount = async (req, res, next) => {
  try {
    const userAccount = await authService.activateAccount(req.validatedData.query)

    return res.status(200).json({
      message: 'Account activated successfully',
      user: userAccount
    })
  } catch (error) {
    next(error)
  }
}

const resendActivation = async (req, res, next) => {
  try {
    const activation = await authService.resendActivation(req.validatedData.body)

    return res.status(200).json({
      message: 'Activation email resent, please check your email',
      data: activation
    })
  } catch (error) {
    next(error)
  }
}

module.exports.authController = {
  signupUser,
  activateAccount,
  resendActivation
}
