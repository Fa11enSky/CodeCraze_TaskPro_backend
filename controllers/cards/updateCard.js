const { Card } = require("../../models");
const { ctrlWrapper, HttpError } = require("../../helpers");

const updateCard = ctrlWrapper(async (req, res) => {
   const { id } = req.params;
   const { title, description, label, deadline } = req.body;

   // Перевірка існування картки з вказаним ідентифікатором
   const card = await Card.findById(id);
   if (!card) {
      throw HttpError(404, "Card not found");
   }

   // Оновлення картки з урахуванням змінених полів
   const updatedFields = {};
   if (title) updatedFields.title = title;
   if (description !== undefined) updatedFields.description = description;
   if (label) updatedFields.label = label;
   if (deadline) updatedFields.deadline = deadline;

   // Перевірка на зміну хоча б одного поля
   if (!title && description === undefined && !label && !deadline) {
      throw HttpError(400, "At least one field must be updated");
   }

   const updatedCard = await Card.findByIdAndUpdate(id, updatedFields, {
      new: true,
   });

   const date = updatedCard.deadline.toLocaleString();
   res.status(200).json({ ...updatedCard._doc, deadline: date });
});

module.exports = updateCard;
