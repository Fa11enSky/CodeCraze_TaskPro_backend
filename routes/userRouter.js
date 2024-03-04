const express = require("express");

const { currentUser, sendHelpMe } = require("../controllers/users");
const { protect, validateBody } = require("../middlewares");
const { helpSchema } = require("../schemas");

const userRouter = express.Router();

userRouter
  .get("/current", protect, currentUser)
  .patch("/update")
  .patch("/themes")
  .post("/help", validateBody(helpSchema), protect, sendHelpMe);

module.exports = userRouter;
