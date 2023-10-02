const httpStatus = require("http-status")

class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
  }
}

module.exports = {
  ErrorResponse,
  NotFound: new ErrorResponse("Not found.", httpStatus.NOT_FOUND),
  BadRequest: new ErrorResponse("Bad Request.",httpStatus.BAD_REQUEST),
  EmailExist: new ErrorResponse("Email already exists", httpStatus.BAD_REQUEST)
}