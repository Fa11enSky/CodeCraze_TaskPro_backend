const { ctrlWrapper, HttpError } = require("../../helpers");
const { Column } = require("../../models");

const updateColumn = ctrlWrapper(async (req, res) => {
    const { id: columnOwner  } = req.params;
    const { title } = req.body;
    
    const isColumnExists = await Column.findOne({columnOwner , title });

  if (isColumnExists) {
    throw HttpError(409, `Column "${title}" already exist`);
    }
    
    const result = await Column.findOneAndUpdate({ _id: id }, { title }, { new: true });
    
   res.json({
    id,
    message: `Column with id ${id} updated successfully`
  });
});

module.exports = updateColumn;
