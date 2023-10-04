const Joi = require('joi');



module.exports = {
  
  registerSchema: Joi.object({
    username:Joi.string().min(3).required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(8).required(),
    gender:Joi.string().valid('m','f'),
    full_name:Joi.string(),
    first_name:Joi.string(),
    last_name:Joi.string(),
  }),
    // username or email required

  loginSchema : Joi.object({
    credentials: Joi.alternatives().try(
      Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
      }),
      Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
      })
    ),
  })
}