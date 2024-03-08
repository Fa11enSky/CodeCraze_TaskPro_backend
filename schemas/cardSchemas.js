const Joi = require("joi");

const addCardSchema = Joi.object({
   title: Joi.string()
      .required()
      .messages({ "any.required": "missing required Card title" }),
   description: Joi.string(),
   label: Joi.string().valid("without", "low", "medium", "high"),
   deadline: Joi.date().greater("now"),
   cardOwner: Joi.string(),
});

const updateCardSchema = Joi.object({
   title: Joi.string(),
   description: Joi.string(),
   label: Joi.string().valid("without", "low", "medium", "high"),
   deadline: Joi.date().greater("now"),
   cardOwner: Joi.string(),
});

module.exports = { addCardSchema, updateCardSchema };
