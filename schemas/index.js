const { registerSchema, loginSchema } = require("./authSchemas");
const helpSchema = require("./helpSchema");
const { updateUserSchema, themeSchema } = require("./userSchemas");
const { addBoardSchema, updateBoardSchema } = require("./boardSchemas");
const { addCardSchema, updateCardSchema } = require("./cardSchemas");

const {
   addColumnSchema,
   updateColumnSchema,
} = require("./columnSchema");

module.exports = {
   registerSchema,
   loginSchema,
   updateUserSchema,
   helpSchema,
   themeSchema,
   addBoardSchema,
   updateBoardSchema,
   addColumnSchema,
   updateColumnSchema,
   addCardSchema,
   updateCardSchema,
};
