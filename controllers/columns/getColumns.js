const { Column } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const getColumns = ctrlWrapper(async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Column.find({ owner });
  res.json(result);
});

module.exports = getColumns;
