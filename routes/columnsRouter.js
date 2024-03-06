const express = require("express");

const {
  //   getColumn,
  //   getColumnById,
  addColumn,
  //updateColumn,
  //deleteColumn,
} = require("../controllers/columns");
const { protect, validateBody } = require("../middlewares");
const { addColumnSchema } = require("../schemas");

const columnsRouter = express.Router();

columnsRouter.post("/", protect, validateBody(addColumnSchema), addColumn);
//   .get("/", protect, getColumns)
//   .get("/:id", protect, getColumnById);
// .patch("/:id", protect, validateBody(updateColumnSchema), updateColumn)
// .delete("/:id", protect, deleteColumn);

module.exports = columnsRouter;
