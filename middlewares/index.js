const { protect } = require("./authMiddleware");
const validateBody = require("./validateBody");
const handleMongooseError = require("./handleMongooseError");
const validateId = require("./validateId");

module.exports = {
   protect,
   validateBody,
   handleMongooseError,
   validateId,
};
