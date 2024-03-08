const express = require("express");

const {
   currentUser,
   updateUser,
   sendHelpMe,
   updateTheme,
} = require("../controllers/users");
const { protect, validateBody, upload } = require("../middlewares");
const { updateUserSchema, helpSchema, themeSchema } = require("../schemas");

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
   .patch("/themes", protect, validateBody(themeSchema), updateTheme)
   .post("/help", protect, validateBody(helpSchema), sendHelpMe);

module.exports = userRouter;
