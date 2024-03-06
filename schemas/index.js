const { registerSchema, loginSchema } = require("./authSchemas");
const helpSchema = require("./helpSchema");
const {
  updateUserSchema,
  themeSchema,
  updateActiveBoardSchema,
} = require("./userSchemas");
const { addBoardSchema } = require("./boardSchemas");
const { addCardSchema, updateCardSchema } = require("./cardSchemas");

const { addColumnSchema, updateColumnSchema } = require("./columnSchema");

module.exports = {
  registerSchema,
  loginSchema,
  updateUserSchema,
  helpSchema,
  themeSchema,
  updateActiveBoardSchema,
  addBoardSchema,
  addColumnSchema,
  updateColumnSchema,
  addCardSchema,
  updateCardSchema,
};
