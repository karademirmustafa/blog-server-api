const Joi = require('joi');



module.exports = {
  registerSchema: Joi.object({
    username:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().required(),
    gender:Joi.string().valid('m','f'),
    full_name:Joi.string(),
    first_name:Joi.string(),
    last_name:Joi.string(),
  }),
}