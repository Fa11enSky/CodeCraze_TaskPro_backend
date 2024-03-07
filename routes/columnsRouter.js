const express = require("express");

const {
   addColumn,
   deleteColumn,
   updateColumn,
} = require("../controllers/columns");
const { protect, validateBody } = require("../middlewares");
const { addColumnSchema, updateColumnSchema } = require("../schemas");

const columnsRouter = express.Router();

columnsRouter
   .post("/:id", protect, validateBody(addColumnSchema), addColumn)
   .patch("/:id", protect, validateBody(updateColumnSchema), updateColumn)
   .delete("/:id", protect, deleteColumn);

module.exports = columnsRouter;
