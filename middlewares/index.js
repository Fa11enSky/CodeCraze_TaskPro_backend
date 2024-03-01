const validateBody = require("./validateBody");
const handleMongooseError = require("./handleMongooseError");
const validateId = require("./validateId");
const protect = require("./authMiddleware");

module.exports = {
   protect,
   validateBody,
   handleMongooseError,
   validateId,
};
