const { ctrlWrapper } = require("../../helpers");
const { Column, Card } = require("../../models");

const deleteColumn = ctrlWrapper(async (req, res) => {
    const { id } = req.params;
    
     await Card.deleteMany({ cardOwner: id });
     const resultCol = await Column.findByIdAndDelete({ _id: id });
    
  res.json(resultCol);
});

module.exports = deleteColumn;
