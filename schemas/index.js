const { registerSchema, loginSchema } = require("./authSchemas");
const { updateUserSchema } = require("./userSchemas");

module.exports = { registerSchema, loginSchema, updateUserSchema };
