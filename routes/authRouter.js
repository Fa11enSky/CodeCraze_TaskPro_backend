const express = require("express");

const UsersController = require("../controllers/userCtrl");
const { protect, validateBody } = require("../middlewares");

const { loginSchema, registerSchema } = require("../models/UserModel");
const { register } = require("../controllers/auth");

const usersRouter = express.Router();

usersRouter
   .post("/register", validateBody(registerSchema), register)
   .post("/login", UsersController.login)
   .get("/logout", protect, UsersController.logout)
   .get("/current", protect, UsersController.current);

module.exports = usersRouter;
