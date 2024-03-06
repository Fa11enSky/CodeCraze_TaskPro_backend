const { Column } = require("../../models");
const { HttpError, ctrlWrapper } = require("../../helpers");

const addColumn = ctrlWrapper(async (req, res) => {
  const { title } = req.body;

  const isColumnExists = await Column.findOne({ title });

  if (isColumnExists) {
    throw HttpError(409, `Column "${title}" already exist`);
  }

  const result = await Column.create({ ...req.body, columnOwner });
  res.status(201).json(result);
});

module.exports = addColumn;
