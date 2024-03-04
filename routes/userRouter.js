const express = require("express");

const {
   currentUser,
   updateUser,
   sendHelpMe,
   updateTheme,
   updateActiveBoard,
} = require("../controllers/users");
const { protect, validateBody, upload } = require("../middlewares");
const {
   updateUserSchema,
   helpSchema,
   themeSchema,
   updateActiveBoardSchema,
} = require("../schemas");

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
   .patch(
      "/board",
      protect,
      validateBody(updateActiveBoardSchema),
      updateActiveBoard
   )
   .post("/help", protect, validateBody(helpSchema), sendHelpMe);

module.exports = userRouter;
