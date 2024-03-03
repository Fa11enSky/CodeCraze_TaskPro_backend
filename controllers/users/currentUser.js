const { HttpError, ctrlWrapper } = require("../../helpers");
const { User } = require("../../models");

const currentUser = ctrlWrapper(async (req, res, next) => {
   const { token } = req.user;

   const user = await User.findOne({ token });

   if (!user) throw HttpError(401, "User data not found");
   const { name, email } = user;

   res.status(200).json({
      name,
      email,
   });
});

module.exports = currentUser;
