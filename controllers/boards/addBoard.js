const { Board, User } = require("../../models");
const { HttpError, ctrlWrapper } = require("../../helpers");

const addBoard = ctrlWrapper(async (req, res) => {
   const { _id: owner } = req.user;
   const { title } = req.body;

   // Перевіряємо, чи існує доска з такою ж назвою для цього користувача
   const isBoardExists = await Board.findOne({ owner, title });
   if (isBoardExists) {
      throw HttpError(409, `Board "${title}" already exists`);
   }

   // Створюємо нову дошку
   const newBoard = await Board.create({ ...req.body, owner });

   // Оновлюємо поле activeBoard користувача з ID нової доски
   await User.findByIdAndUpdate(owner, {
      activeBoard: newBoard._id,
   });
   //Повертаємо створену дошку
   res.status(201).json(newBoard);
});

module.exports = addBoard;
