const express = require("express");


const { currentUser, updateUser,sendHelpMe } = require("../controllers/users");
const { protect, validateBody, upload } = require("../middlewares");
const { updateUserSchema,helpSchema } = require("../schemas");

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
   .post("/help", validateBody(helpSchema), protect, sendHelpMe);

module.exports = userRouter;
