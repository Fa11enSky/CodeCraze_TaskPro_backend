const { HttpError, ctrlWrapper } = require("../../helpers");
const { User } = require("../../models");
const { signToken } = require("../../services");

const register = ctrlWrapper(async (req, res) => {
   const { email } = req.body;
   const user = await User.findOne({ email });

   if (user) {
      throw HttpError(409, "Email in use");
   }

   //! додати  запит на базову аватарку
   const avatarURL = "https://cloudinary.com/avatar.jpeg";

   const newUser = await User.create({ ...req.body, avatarURL });

   const { _id: id } = newUser;

   const token = signToken(id);
   await User.findByIdAndUpdate(id, { token });

   res.status(201).json({
      token,
      user: {
         name: newUser.name,
         email: newUser.email,
         theme: newUser.theme,
         avatarURL: newUser.avatarURL,
      },
   });
});

module.exports = register;
