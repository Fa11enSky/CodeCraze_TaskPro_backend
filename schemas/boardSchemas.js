const Joi = require("joi");

const addBoardSchema = Joi.object({
   title: Joi.string()
      .required()
      .messages({ "any.required": "missing required Board title" }),
   icon: Joi.string().valid(
      "icon-project",
      "icon-star",
      "icon-loading",
      "icon-puzzle",
      "icon-container",
      "icon-lightning",
      "icon-colors",
      "icon-hexagon"
   ),
   background: Joi.string(),
   owner: Joi.string(),
});

const updateBoardSchema = Joi.object({
   title: Joi.string(),
   icon: Joi.string().valid(
      "icon-project",
      "icon-star",
      "icon-loading",
      "icon-puzzle",
      "icon-container",
      "icon-lightning",
      "icon-colors",
      "icon-hexagon"
   ),
   background: Joi.string(),
});

module.exports = { addBoardSchema, updateBoardSchema };
