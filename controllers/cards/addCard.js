const { Card } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const addCard = ctrlWrapper(async (req, res) => {
   const { id: cardOwner } = req.params;

   const result = await Card.create({ ...req.body, cardOwner });
   res.status(201).json(result);
});

module.exports = addCard;
