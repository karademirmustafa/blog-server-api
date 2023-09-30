const { ErrorResponse } = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
  let error = { ...err }

  error.message = err.message
  let status = 500

  if (err.code === 11000) {
    const message = `You have entered the duplicate value. Try again.`
    console.log(err,"err")
    error = new ErrorResponse(message, 400)
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => {
      val.message
    })
    error = new ErrorResponse(message, 400)
  }
  if (error.details) {
    message = err.details.map((detail) => detail.message).join(', ')
    error = new ErrorResponse(message, 400)
  }
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => {
      val.message
    })
    error = new ErrorResponse(message, 400)
  }

  res.status(error.statusCode || 500).json({
    status: false,
    message: error.message || 'Server Error',
    data: null,
  })
}

module.exports = errorHandler