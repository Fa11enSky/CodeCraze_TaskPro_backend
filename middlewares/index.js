const validateBody = require("./validateBody");
const handleMongooseError = require("./handleMongooseError");
const validateId = require("./validateId");
const protect = require("./authMiddleware");
const upload = require("./uploadMiddleware");

module.exports = {
   protect,
   validateBody,
   handleMongooseError,
   validateId,
   upload,
};
