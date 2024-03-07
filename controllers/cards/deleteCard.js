const { ctrlWrapper } = require("../../helpers");
const { Card } = require("../../models");


const deleteCard = ctrlWrapper(async (req, res) => {
   const { id } = req.params;

await Card.deleteMany({ cardOwner: id });
const resultCol = await Card.findByIdAndDelete({ _id: id });

res.json(resultCol);
});

module.exports = deleteCard;
