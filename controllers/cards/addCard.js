const { Card, Column } = require("../../models");
const { ctrlWrapper, HttpError } = require("../../helpers");

const addCard = ctrlWrapper(async (req, res) => {
   const { id } = req.params;

   // Перевірка наявності колонки з вказаним ідентифікатором
   const column = await Column.findById(id);
   if (!column) {
      throw HttpError(404, "Column  not found");
   }

   // Створення картки та додавання до колонки
   const result = await Card.create({
      ...req.body,
      cardOwner: id,
   });

   const deadline = result.deadline.toLocaleString();

   //конвертується для адекватного відображення дедлайну
   const data = { ...result._doc, deadline };

   res.status(201).json(data);
});

module.exports = addCard;
