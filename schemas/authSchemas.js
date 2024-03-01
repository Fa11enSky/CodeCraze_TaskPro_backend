const Joi = require("joi");

const registerSchema = Joi.object({
   name: Joi.string().min(3).required(),
   password: Joi.string().min(8).max(32).required(),
   email: Joi.string().required(),
});

const loginSchema = Joi.object({
   password: Joi.string().required(),
   email: Joi.string().required(),
   token: Joi.string(),
});

module.exports = { registerSchema, loginSchema };