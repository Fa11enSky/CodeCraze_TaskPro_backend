const { Column } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const getColumns = ctrlWrapper(async (req, res) => {
  const { owner } = req.body;

  const result = await Board.find({ owner });
  res.json(result);
});

module.exports = getColumns;
