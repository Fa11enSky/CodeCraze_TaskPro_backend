const express = require("express");

const {
   getBoards,
   getBoardById,
   addBoard,
   updateBoard,
   deleteBoard,
} = require("../controllers/boards");
const { protect, validateBody, validateId } = require("../middlewares");
const { addBoardSchema, updateBoardSchema } = require("../schemas");

const boardsRouter = express.Router();

boardsRouter
   .post("/", protect, validateBody(addBoardSchema), addBoard)
   .get("/", protect, getBoards)
   .get("/:id", protect, validateId, getBoardById)
   .patch(
      "/:id",
      protect,
      validateId,
      validateBody(updateBoardSchema),
      updateBoard
   )
   .delete("/:id", protect, validateId, deleteBoard);

module.exports = boardsRouter;
