// import multer from "multer";
// import path from "path";
const HttpError = require("../helpers");
const { checkToken, getUserSrv } = require("../services/index.js");
// import { nanoid } from "nanoid";

const protect = async (req, res, next) => {
   try {
      const token =
         req.headers.authorization?.startsWith("Bearer ") &&
         req.headers.authorization.split(" ")[1];

      if (!token) throw HttpError("401", "Not authorized");

      const userId = checkToken(token);

      if (!userId) throw HttpError("401", "Not authorized");

      const currentUser = await getUserSrv(userId);
      // console.log(currentUser);

      if (!currentUser) throw HttpError("401", "Not authorized");

      // console.log(currentUser);
      req.user = currentUser;

      next();
   } catch (error) {
      next(error);
   }
};

module.exports = { protect };
