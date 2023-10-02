const BaseService = require("./BaseService");
const User = require("../models/User");
const responseFormatter = require("../utils/responseFormatter");
const constants = require("../constants/auth");
class UserService extends BaseService {
    constructor() {
        super(User);
    }

    sendToken(user, statusCode, res) {
       const {email_verified} = user;
        const token = user.getSignedToken();
        let message = statusCode===201 ? constants.CREATE_USER_MESSAGE : constants.LOGIN_USER_MESSAGE;
        const data = {
            token,
            email_verified
        }
       // httpStatus --> exmample : 200_Message --> OK
        return res.status(statusCode).json(responseFormatter.createSuccessResponse(message,data))
    }
}




module.exports = new UserService();