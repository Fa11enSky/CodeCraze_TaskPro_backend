const Joi = require("joi");

const helpSchema = Joi.object({
  email: Joi.string().required().email(),
  comment: Joi.string().required().max(256),
});

module.exports = helpSchema;
