const { ctrlWrapper } = require("../../helpers");
const { Card, Column } = require("../../models");

const updateColumn = ctrlWrapper(async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    
    const isColumnExists = await Column.findOne({ title });

  if (isColumnExists) {
    throw HttpError(409, `Column "${title}" already exist`);
    }
    
    const result = await Column.findOneAndUpdate({ _id: id }, { title }, { new: true });
    
  res.json(result);
});

module.exports = updateColumn;
