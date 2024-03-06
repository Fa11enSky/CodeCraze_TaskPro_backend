const Joi = require("joi");

const addColumnSchema = Joi.object({
  title: Joi.string()
    .required()
    .messages({ "any.required": "missing required Column title" }),
  columnOwner: Joi.string(),
});

const updateColumnSchema = Joi.object({
  title: Joi.string()
    .required()
    .messages({ "any.required": "missing required Column title" }),
});

module.exports = { addColumnSchema, updateColumnSchema };
