const HttpError = require('http-errors')

const validateDto = (schemaDto) => async (req, res, next) => {
  try {
    const value = await schemaDto.validateAsync(req, { abortEarly: false })

    req.body = value.body
    req.params = value.params
    req.query = value.query
    req.headers = value.headers

    next()
  } catch (error) {
    next(HttpError.UnprocessableEntity(error.message))
  }
}

module.exports = validateDto
