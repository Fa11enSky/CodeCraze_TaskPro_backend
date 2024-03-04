const { HttpError, ctrlWrapper } = require("../../helpers");
const { User } = require("../../models");

const currentUser = ctrlWrapper(async (req, res, next) => {
   const { token } = req.user;

   const user = await User.findOne({ token });

   if (!user) throw HttpError(401, "User data not found");

   res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      theme: user.theme,
      avatarUrl: user.avatarURL,
      activeBoard: user.activeBoard,
   });
});

module.exports = currentUser;
