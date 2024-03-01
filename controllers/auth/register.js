const { HttpError, ctrlWrapper } = require("../../helpers");
const { User } = require("../../models/UserModel");

const register = ctrlWrapper(async (req, res) => {
   const { email } = req.body;
   const user = await User.findOne({ email });

   if (user) {
      throw HttpError(409, "Email in use");
   }

   const newUser = await User.create(req.body);

   res.status(201).json({
      user: {
         name: newUser.name,
         email: newUser.email,
      },
   });
});

module.exports = register;
