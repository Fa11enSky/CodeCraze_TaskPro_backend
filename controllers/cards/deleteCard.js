const { ctrlWrapper, HttpError } = require("../../helpers");
const { Card } = require("../../models");


const deleteCard = ctrlWrapper(async (req, res) => {
   const { id } = req.params;

const result = await Card.findByIdAndDelete({ _id: id });

if (!result) {
   throw HttpError(404, `Card with id ${id} not found`);
}
res.json({
   id,
   message: `Card with id ${id} deleted successfully`,
});
});

module.exports = deleteCard;
