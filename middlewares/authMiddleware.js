const { HttpError, ctrlWrapper } = require("../helpers");
const { User } = require("../models");
const { checkToken} = require("../services");

const protect = ctrlWrapper(async (req, res, next) => {
   const token =
      req.headers.authorization?.startsWith("Bearer ") &&
      req.headers.authorization.split(" ")[1];

   if (!token) throw HttpError("401", "Not authorized");

   const id = checkToken(token);
   if (!id) throw HttpError("401", "Not authorized");

   const currentUser = await User.findOne({ token });
   if (!currentUser) throw HttpError("401", "Not authorized");

   req.user = currentUser;

   next();
});

module.exports =  protect ;
