const { ctrlWrapper, HttpError } = require("../../helpers");
const { Column, Card } = require("../../models");

const deleteColumn = ctrlWrapper(async (req, res) => {
  const { id } = req.params;

  const isColumnExists = await Column.findOne({ id });

  if (isColumnExists) {
    throw HttpError(409, `Column with id "${id}" not found`);
  }

  await Card.deleteMany({ cardOwner: id });
  const resultCol = await Column.findByIdAndDelete({ _id: id });

  res.json({
    id,
    message: `Column with id ${id} and its related cards deleted successfully`
  });
});

module.exports = deleteColumn;
