const nodemailer = require('nodemailer')
const env = require('../config/environment')
const { getActivationEmailTemplate } = require('../templates/accountTemplate')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: env.GOOGLE_APP_USER,
    pass: env.GOOGLE_APP_PASSWORD
  }
})

const sendActivationEmail = async (email, activationToken) => {
  const activationLink = `${env.APP_BASE_URL}/auth/activate?token=${activationToken}`

  const activationEmailHTML = getActivationEmailTemplate({
    APP_NAME: env.APP_NAME || 'Our Service',
    ACTIVATION_LINK: activationLink,
    USER_EMAIL: email,
    SUPPORT_EMAIL: env.SUPPORT_EMAIL || 'support@_to_text.com',
    EXPIRATION_TIME: '5 minutes'
  })

  const sendEmail = await transporter.sendMail({
    from: `${env.APP_NAME} <${env.GOOGLE_APP_USER}>`,
    to: email,
    subject: 'Activate Your Account',
    html: activationEmailHTML,
    text: `Please activate your account by visiting: ${activationLink}\n\nThis link expires in 5 minutes.`
  })

  return sendEmail
}

module.exports = {
  sendActivationEmail
}
