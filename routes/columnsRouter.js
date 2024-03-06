const express = require("express");

const {
  addColumn, getColumns, getColumnById, deleteColumn, updateColumn,
  //updateColumn,
  //deleteColumn,
} = require("../controllers/columns");
const { protect, validateBody } = require("../middlewares");
const { addColumnSchema, updateColumnSchema } = require("../schemas");

const columnsRouter = express.Router();

columnsRouter.post("/:id", protect, validateBody(addColumnSchema), addColumn)
  // .get("/:id", protect, getColumns)
  .get("/:id", protect, getColumnById)
  .patch("/:id", protect, validateBody(updateColumnSchema), updateColumn)
  .delete("/:id", protect, deleteColumn);

module.exports = columnsRouter;
