const express = require("express");

const {
   addColumn,
   deleteColumn,
   updateColumn,
} = require("../controllers/columns");
const { protect, validateBody, validateId } = require("../middlewares");
const { addColumnSchema, updateColumnSchema } = require("../schemas");

const columnsRouter = express.Router();

columnsRouter
   .post("/:id", protect, validateId, validateBody(addColumnSchema), addColumn)
   .patch(
      "/:id",
      protect,
      validateId,
      validateBody(updateColumnSchema),
      updateColumn
   )
   .delete("/:id", protect, validateId, deleteColumn);

module.exports = columnsRouter;
