const httpStatus = require("http-status");
const UserService = require("../services/UserService");
const { EmailExist, NotFoundUser, PasswordMisMatch } = require("../utils/errorResponse");

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

const login = async (req, res, next) => {
    try {
        const { credentials } = req.body;
        // email or username 
        const {username,email,password}=credentials;
        const query = {
            $or: [{ username }, { email }]
        }

        const user = await UserService.findOne(query);
        // User not found
        if (!user) throw NotFoundUser;

        //Not matches password
        if (!await user.comparePassword(password)) throw PasswordMisMatch;

        // successfull
        return UserService.sendToken(user, httpStatus.OK, res);



    } catch (err) { next(err) }
}

module.exports = {
    register,
    login
}