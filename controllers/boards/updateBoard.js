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

   // Перевіряємо, чи існує доска з такою ж назвою для цього користувача
   const isBoardExists = await Board.findOne({ owner, title });
   if (isBoardExists) {
      throw HttpError(409, `Board "${title}" already exists`);
   }

   // Перевіряємо, чи є дані для оновлення і чи нові значення відрізняються від попередніх
   if (
      (title && title !== board.title) ||
      (icon && icon !== board.icon) ||
      (background !== undefined && background !== board.background)
   ) {
      // Оновлюємо дані дошки за наявності відповідних полів в тілі запиту
      if (title) board.title = title;
      if (icon) board.icon = icon;
      if (background !== undefined) board.background = background;

      // Зберігаємо оновлену дошку в базі даних
      const updatedBoard = await board.save();

      res.json(updatedBoard);
   } else {
      throw HttpError(400, "No data to update");
   }
});

module.exports = updateBoard;
