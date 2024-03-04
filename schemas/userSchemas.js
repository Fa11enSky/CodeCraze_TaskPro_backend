const Joi = require("joi");

const themeList = ["light", "dark", "violet"];

const updateUserSchema = Joi.object({
   name: Joi.string().min(2).max(32),
   email: Joi.string().email(),
   password: Joi.string().min(6).max(64),
});

const updateActiveBoardSchema = Joi.object({
   activeBoard: Joi.string().required(),
});

const themeSchema = Joi.object({
   theme: Joi.string()
      .valid(...themeList)
      .required()
      .messages({
         "any.required": "Missing required theme field",
         "any.only": "Field theme must be one of {{#valids}}",
      }),
});

module.exports = { updateUserSchema, themeSchema, updateActiveBoardSchema };
