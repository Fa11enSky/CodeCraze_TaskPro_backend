const { Column } = require("../../models");
const { HttpError, ctrlWrapper } = require("../../helpers");

const addColumn = ctrlWrapper(async (req, res) => {
   const { id: columnOwner } = req.params;
   const { title } = req.body;

   const isColumnExists = await Column.findOne({ columnOwner, title });

   if (isColumnExists) {
      throw HttpError(409, `Column "${title}" already exist`);
   }

   const result = await Column.create({ ...req.body, columnOwner });
   res.status(201).json(result);
});

module.exports = addColumn;
