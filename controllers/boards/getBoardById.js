const mongoose = require("mongoose");
const { Board } = require("../../models");
const { ctrlWrapper, HttpError } = require("../../helpers");

const getBoardById = ctrlWrapper(async (req, res) => {
   const { id } = req.params;

   const board = await Board.aggregate([
      {
         $match: {
            _id: new mongoose.Types.ObjectId(id),
         },
      },
      {
         $lookup: {
            from: "columns",
            localField: "_id",
            foreignField: "board",
            as: "columns",
         },
      },
      {
         $unwind: {
            path: "$columns",
            preserveNullAndEmptyArrays: true,
         },
      },
      {
         $lookup: {
            from: "cards",
            localField: "columns._id",
            foreignField: "column",
            as: "columns.cards",
         },
      },
      {
         $group: {
            _id: "$_id",
            title: { $first: "$title" },
            background: { $first: "$background" },
            columns: {
               $push: {
                  _id: "$columns._id",
                  title: "$columns.title",
                  cards: "$columns.cards",
               },
            },
            title: { $first: "$title" }, // Добавляем второй раз, чтобы убедиться, что title сохраняется
         },
      },
   ]);

   if (!board) {
      throw HttpError(404, "Board is not found");
   }

   res.json(board[0]);
});

module.exports = getBoardById;
