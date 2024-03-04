const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers/index.js");

require("dotenv").config();

const { SECRET_KEY } = process.env; // Из файла .env

const signToken = (id) => jwt.sign({ id }, SECRET_KEY, { expiresIn: "1h" });

const checkToken = (token) => {
  if (!token) throw HttpError(401, "Not authorized");
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    return id;
  } catch (error) {
    throw HttpError(401, "Not authorized");
  }
};

module.exports = { signToken, checkToken };
