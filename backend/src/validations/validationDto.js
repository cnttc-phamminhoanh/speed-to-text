const HttpError = require('http-errors')

const validateDto = (schemaDto) => async (req, res, next) => {
  try {
    const dataToValidate = {
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers
    }

    const validatedData = await schemaDto.validateAsync(dataToValidate, {
      abortEarly: false
    })

    req.validatedData = {
      body: validatedData.body || {},
      params: validatedData.params || {},
      query: validatedData.query || {},
      headers: validatedData.headers || {}
    }

    next()
  } catch (error) {
    const errors = error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message.replace(/['"]+/g, ''),
      type: detail.type
    }))

    next(HttpError.UnprocessableEntity({ errors }))
  }
}

module.exports = validateDto
