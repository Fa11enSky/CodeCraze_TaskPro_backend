const { registerSchema, loginSchema } = require("./authSchemas");
const helpSchema = require("./helpSchema");
const {
   updateUserSchema,
   themeSchema,
   updateActiveBoardSchema,
} = require("./userSchemas");
const { addBoardSchema } = require("./boardSchemas");

module.exports = {
   registerSchema,
   loginSchema,
   updateUserSchema,
   helpSchema,
   themeSchema,
   updateActiveBoardSchema,
   addBoardSchema,
};
