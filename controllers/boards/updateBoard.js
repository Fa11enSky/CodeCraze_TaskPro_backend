const { Board } = require("../../models");
const { HttpError, ctrlWrapper } = require("../../helpers");

const updateBoard = ctrlWrapper(async (req, res) => {
   const { _id: owner } = req.user;
   const { id } = req.params;

   const { title, icon, background } = req.body;

   // Перевіряємо, чи існує дошка з вказаним ID та власником
   const board = await Board.findOne({ _id: id, owner });
   if (!board) {
      throw HttpError(404, "Not Found");
   }

   // Перевіряємо, чи є дані для оновлення
   if (!title && !icon && !background) {
      throw HttpError(400, "No data to update");
   }

   // Оновлюємо дані дошки за наявності відповідних полів в тілі запиту
   if (title) board.title = title;
   if (icon) board.icon = icon;
   if (background) board.background = background;

   // Зберігаємо оновлену дошку в базі даних
   const updatedBoard = await board.save();

   res.json(updatedBoard);
});

module.exports = updateBoard;
