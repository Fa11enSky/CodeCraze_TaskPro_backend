const { User, Board, Column, Card } = require("../../models");
const { HttpError, ctrlWrapper } = require("../../helpers");

const deleteBoard = ctrlWrapper(async (req, res) => {
   const { id } = req.params;
   const { _id } = req.user;

   // Знаходимо всі колонки, пов'язані з даною дошкою
   const columns = await Column.find({ board: id });

   // Для кожної колонки знаходимо і видаляємо всі пов'язані з нею картки
   for (const column of columns) {
      await Card.deleteMany({ column: column._id });
   }

   // Видаляємо всі колонки, пов'язані з даною дошкою
   await Column.deleteMany({ board: id });

   // Видаляємо саму дошку за її ID
   const deletedBoard = await Board.findByIdAndDelete(id);

   // Перевіряємо, чи була знайдена та видалена дошка
   if (!deletedBoard) {
      throw HttpError(404, `Board with id ${id} not found`);
   }

   // Оновлюємо поле activeBoard користувача з ID нової доски
   await User.findByIdAndUpdate(_id, {
      activeBoard: null,
   });

   res.json({
      id,
      message: `Board with id ${id} and its related columns and cards deleted successfully`,
   });
});

module.exports = deleteBoard;
