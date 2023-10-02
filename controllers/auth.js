const UserService = require("../services/UserService");
const { EmailExist } = require("../utils/errorResponse");

const register = async (req, res, next) => {
    try {
        const { email } = req.body;

        const isEmail = await UserService.findOne({ email });
        // email already exist
        if (isEmail) throw EmailExist;

        const newUser = await UserService.create(req.body);
        //Get response token
        UserService.sendToken(newUser, 201, res)

    } catch (err) { next(err) }
}

module.exports = {
    register
}