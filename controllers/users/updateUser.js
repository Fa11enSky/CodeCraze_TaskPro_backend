const fs = require("fs").promises;
const bcrypt = require("bcrypt");

const { HttpError, ctrlWrapper, cloudinary } = require("../../helpers");
const { User } = require("../../models");

const updateUser = ctrlWrapper(async (req, res) => {
   const { _id } = req.user;
   const { name, password, email } = req.body;

   const user = await User.findOne({ email });

   if (user) {
      throw HttpError(409, "Email in use");
   }

   const updatedUser = {};

   if (name && name !== req.user.name) {
      updatedUser.name = name;
   }

   if (password) {
      updatedUser.password = await bcrypt.hash(password, 10);
   }

   if (email) {
      updatedUser.email = email;
   }

   if (req.file) {
      const imagePath = req.file.path;
      const uploadedImage = await cloudinary.uploader.upload(imagePath, {
         use_filename: true,
         public_id: `user_avatar-${_id}`,
         unique_filename: false,
         overwrite: true,
         folder: "avatars",
         transformation: [{ height: 100, width: 100, crop: "scale" }],
      });
      const newAvatarURL = uploadedImage.secure_url;
      await fs.unlink(req.file.path);
      updatedUser.avatarURL = newAvatarURL;
   }

   const updatedUserKeys = Object.keys(updatedUser).length;

   if (!updatedUserKeys) {
      throw HttpError(400, "No changes were made");
   }

   const result = await User.findByIdAndUpdate(_id, updatedUser, {
      new: true,
   });

   res.json({
      name: result.name,
      email: result.email,
      theme: result.theme,
      avatarURL: result.avatarURL,
      activeBoard: result.activeBoard,
   });
});

module.exports = updateUser;
