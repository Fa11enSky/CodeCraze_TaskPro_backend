const express = require("express");

const { register, logout, login } = require("../controllers/auth");
const { protect, validateBody } = require("../middlewares");
const { registerSchema, loginSchema } = require("../schemas");

const authRouter = express.Router();

authRouter
   .post("/register", validateBody(registerSchema), register)
   .post("/login", validateBody(loginSchema), login)
   .post("/logout", protect, logout);

module.exports = authRouter;
