const mongoose = require("mongoose");
const { Column } = require("../../models");

const { HttpError, ctrlWrapper } = require("../../helpers");

const getColumnById = ctrlWrapper(async (req, res) => {
   const { id } = req.params;

   const column = await Column.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } }, // Знаходимо колонку за її ID
      {
         $lookup: {
            from: "cards",
            localField: "_id",
            foreignField: "cardOwner",
            as: "cards",
         },
      }, // Пов'язуємо картки з колонками
      { $unwind: { path: "$cards", preserveNullAndEmptyArrays: true } }, // Розгортаємо масив карток
   ]);

   console.log(column);

   // Якщо дошка не знайдена, повертаємо помилку 404
   if (!column || column.length === 0) {
      throw HttpError(404, `Column with id${id} is not found`);
   }

   // Перетворюємо результат агрегації у об'єкт
   const formattedColumn = {
      _id: column[0]._id,
      title: column[0].title,
      ownerColumn: column[0].ownerColumn,
      columns: column.map((col) => ({
         _id: col.cards._id,
         title: col.cards.title,
         columnOwner: col.cards.cardOwner,
      })),
   };

   res.json(formattedColumn);
});

module.exports = getColumnById;
