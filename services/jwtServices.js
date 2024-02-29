const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers/index.js");

require("dotenv").config();

const { JWT_SECRET } = process.env; // Из файла .env

const signToken = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: "1h" });

const checkToken = (token) => {
  if (!token) throw HttpError(401, "Not authorized");
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    return id;
  } catch (error) {
    throw HttpError(401, "Not authorized");
  }
};

module.exports = { signToken, checkToken };
