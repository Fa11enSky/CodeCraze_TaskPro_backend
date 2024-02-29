const express = require("express");

const UsersController = require("../controllers/userCtrl");
const { protect } = require("../middlewares");

const usersRouter = express.Router();

usersRouter
  .post("/register", UsersController.register)
  .post("/login", UsersController.login)
  .get("/logout", protect, UsersController.logout)
  .get("/current", protect, UsersController.current);

module.exports = usersRouter;
