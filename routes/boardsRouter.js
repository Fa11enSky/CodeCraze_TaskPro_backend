const express = require("express");

const {
   getBoards,
   getBoardById,
   addBoard,
   //updateBoard,
   //deleteBoard,
} = require("../controllers/boards");
const { protect, validateBody } = require("../middlewares");
const { addBoardSchema } = require("../schemas");

const boardsRouter = express.Router();

boardsRouter
   .post("/", protect, validateBody(addBoardSchema), addBoard)
   .get("/", protect, getBoards)
   .get("/:id", protect, getBoardById);
// .patch("/:id", protect, validateBody(updateBoardSchema), updateBoard)
// .delete("/:id", protect, deleteBoard);

module.exports = boardsRouter;