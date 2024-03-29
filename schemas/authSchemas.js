const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  password: Joi.string().min(8).max(64).required(),
  email: Joi.string().required().email(),
});

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required().email(),
});

module.exports = { registerSchema, loginSchema };
