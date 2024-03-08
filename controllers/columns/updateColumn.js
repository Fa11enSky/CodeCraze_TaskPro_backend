const { ctrlWrapper, HttpError } = require("../../helpers");
const { Column } = require("../../models");

const updateColumn = ctrlWrapper(async (req, res) => {
   const { id } = req.params;
   const { title } = req.body;

   // Перевірка існування стовпчика з вказаним ідентифікатором
   const column = await Column.findById(id);
   if (!column) {
      throw HttpError(404, "Column not found");
   }

   const columnOwner = column.columnOwner;
   const isColumnExists = await Column.findOne({ columnOwner, title });
   if (isColumnExists) {
      throw HttpError(409, `Column "${title}" already exists`);
   }

   const result = await Column.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
   });

   res.json(result);
});

module.exports = updateColumn;
