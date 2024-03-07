const { Card } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const addCard = ctrlWrapper(async (req, res) => {
   const { id: cardOwner } = req.params;

   const result = await Card.create({
      ...req.body,
      cardOwner,
   });

   console.log(result.deadline.toLocaleString());
   const deadline = result.deadline.toLocaleString();

   //конвертується для адекватного відображення дедлайну
   const data = { ...result._doc, deadline };

   res.status(201).json(data);
});

module.exports = addCard;
