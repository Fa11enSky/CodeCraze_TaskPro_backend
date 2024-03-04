const express = require("express");

const { currentUser, sendHelpMe } = require("../controllers/users");
const { protect, validateBody } = require("../middlewares");
const { helpSchema } = require("../schemas");

const userRouter = express.Router();

userRouter
  .get("/current", protect, currentUser)
  .patch("/update")
  .patch("/themes")
  .post("/help", protect, validateBody(helpSchema), sendHelpMe);

module.exports = userRouter;
