const mongoose = require("mongoose");
const { Board } = require("../../models");

const { HttpError, ctrlWrapper } = require("../../helpers");

const getBoardById = ctrlWrapper(async (req, res) => {
   const { id } = req.params;

   const board = await Board.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } }, // Знаходимо дошку за її ID
      {
         $lookup: {
            from: "columns",
            localField: "_id",
            foreignField: "columnOwner",
            as: "columns",
         },
      }, // Пов'язуємо колонки з дошкою
      { $unwind: { path: "$columns", preserveNullAndEmptyArrays: true } }, // Розгортаємо масив колонок
      {
         $lookup: {
            from: "cards",
            localField: "columns._id",
            foreignField: "cardOwner",
            as: "columns.cards",
         },
      }, // Пов'язуємо картки з колонками
   ]);

   // Якщо дошка не знайдена, повертаємо помилку 404
   if (!board || board.length === 0) {
      throw HttpError(404, `Board with id${id} is not found`);
   }

   // Перетворюємо результат агрегації у об'єкт
   const formattedBoard = {
      _id: board[0]._id,
      title: board[0].title,
      icon: board[0].icon,
      background: board[0].background,
      owner: board[0].owner,
      columns: board.map((col) => ({
         _id: col.columns._id,
         title: col.columns.title,
         columnOwner: col.columns.columnOwner,
         cards: col.columns.cards,
      })),
   };

   res.json(formattedBoard);
});

module.exports = getBoardById;
