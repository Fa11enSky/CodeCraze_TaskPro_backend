const Joi = require("joi");

const updateUserSchema = Joi.object({
   name: Joi.string().min(2).max(32),
   email: Joi.string().email(),
   password: Joi.string().min(6).max(64),
});

module.exports = { updateUserSchema };
