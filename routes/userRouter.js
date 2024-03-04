const express = require("express");

const { currentUser, updateUser } = require("../controllers/users");
const { protect, validateBody, upload } = require("../middlewares");
const { updateUserSchema } = require("../schemas");

const userRouter = express.Router();

userRouter
   .get("/current", protect, currentUser)
   .patch(
      "/update",
      protect,
      upload.single("avatar"),
      validateBody(updateUserSchema),
      updateUser
   )
   .patch("/themes")
   .post("/help");

module.exports = userRouter;
