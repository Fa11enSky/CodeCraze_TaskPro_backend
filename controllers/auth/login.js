const { HttpError, ctrlWrapper } = require("../../helpers");
const  {User}  = require("../../models");  
const { signToken } = require("../../services");


const login = ctrlWrapper(async (req, res, next) => {
    const { email, password } = req.body;
        
    const user = await User.findOne({ email });
   if (!user) throw HttpError(401, "Email or password is wrong");

   const isPasswordValidate = await user.checkPassword(password, user.password);
   if (!isPasswordValidate) throw HttpError(401, "Email or password is wrong");

   const token = signToken(user.id);
   user.token = token;

   //Добавляем в базу значение ТОКЕНА для пользователя который логинится
   await User.findByIdAndUpdate(user.id, user);
   user.password = undefined;

      res.user = user;

    res.status(200).json({
        token,
        user: {
            email: user.email,
        },
    });
});
   
module.exports = login;