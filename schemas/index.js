const { registerSchema, loginSchema } = require("./authSchemas");
const helpSchema = require("./helpSchema");
const {
   updateUserSchema,
   themeSchema,
   updateActiveBoardSchema,
} = require("./userSchemas");
module.exports = {
   registerSchema,
   loginSchema,
   updateUserSchema,
   helpSchema,
   themeSchema,
   updateActiveBoardSchema,
};
