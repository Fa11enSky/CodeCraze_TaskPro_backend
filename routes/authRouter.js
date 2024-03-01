const express = require("express");

const { register, current, logout, login } = require("../controllers/auth");
const { protect, validateBody } = require("../middlewares");
const { registerSchema, loginSchema } = require("../schemas");

const usersRouter = express.Router();

usersRouter
    .post("/register", validateBody(registerSchema), register)
    .post("/login", validateBody(loginSchema), login)
    .get("/logout", protect, logout)
    .get("/current", protect, current);

module.exports = usersRouter;
