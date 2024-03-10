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
   background: Joi.allow(
      null,
      ...[
         "1",
         "2",
         "3",
         "4",
         "5",
         "6",
         "7",
         "8",
         "9",
         "10",
         "11",
         "12",
         "13",
         "14",
         "15",
      ]
   ).default(null),
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
   background: Joi.allow(
      null,
      ...[
         "1",
         "2",
         "3",
         "4",
         "5",
         "6",
         "7",
         "8",
         "9",
         "10",
         "11",
         "12",
         "13",
         "14",
         "15",
      ]
   ),
});

module.exports = { addBoardSchema, updateBoardSchema };
