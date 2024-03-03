const { ctrlWrapper } = require("../../helpers");
const { User } = require("../../models");   


const logout = ctrlWrapper(async (req, res, next) => {
   const { token } = req.user;

   const user = await User.findOne({ token });

   user.token = null;

   //Очищаем в базе значение ТОКЕНА для пользователя
   await User.findByIdAndUpdate(user.id, user);


   res.status(204).json();
});

module.exports = logout;

