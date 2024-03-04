const { HttpError, ctrlWrapper } = require("../../helpers");
const { User } = require("../../models");
const { signToken } = require("../../services");

const register = ctrlWrapper(async (req, res) => {
   const { email } = req.body;
   const user = await User.findOne({ email });

   if (user) {
      throw HttpError(409, "Email in use");
   }

   const avatarURL = null;
   const activeBoard = null;

   const newUser = await User.create({ ...req.body, avatarURL, activeBoard });

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
         activeBoard: newUser.activeBoard,
      },
   });
});

module.exports = register;
