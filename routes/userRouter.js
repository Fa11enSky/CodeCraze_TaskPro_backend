const express = require("express");

const { currentUser } = require("../controllers/users");
const { protect } = require("../middlewares");

const userRouter = express.Router();

userRouter
   .get("/current", protect, currentUser)
   .patch("/update")
   .patch("/themes")
   .post("/help");

module.exports = userRouter;
