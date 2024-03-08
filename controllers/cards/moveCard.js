const { Card, Column } = require("../../models");
const { HttpError, ctrlWrapper } = require("../../helpers");

const moveCard = ctrlWrapper(async (req, res) => {
   const { id } = req.params;
   const { newColumnId } = req.body;

   // Перевіряємо, чи існує карта з вказаним ідентифікатором
   const card = await Card.findById(id);
   if (!card) {
      throw HttpError(404, `Card ${id} not found`);
   }

   if (typeof newColumnId === "string" && newColumnId.length !== 24) {
      throw HttpError(400, "Invalid new column id");
   }

   // Перевіряємо, чи належить новий стовпчик до тієї самої дошки
   const [column, newColumn] = await Promise.all([
      Column.findById(card.cardOwner),
      Column.findById(newColumnId),
   ]);

   if (!newColumn || !newColumn.columnOwner.equals(column.columnOwner)) {
      throw HttpError(
         400,
         `Column "${newColumnId}" is not available for moving the card to`
      );
   }

   // Оновлюємо поле cardOwner для переміщення карти в нову колонку
   card.cardOwner = newColumnId;
   const result = await card.save();

   res.json({
      message: `Card "${id}" successfully moved to column "${newColumnId}"`,
      result,
   });
});

module.exports = moveCard;
