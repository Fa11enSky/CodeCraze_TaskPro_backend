const { HttpError, ctrlWrapper } = require("../helpers");
const { User } = require("../models/UserModel");

const {
   loginUserSrv,
   logoutUserSrv,
   //  addUserSrv,
   currentUserSrv,
} = require("../services");

class UsersController {
   login = ctrlWrapper(async (req, res, next) => {
      const { error } = await User.validate(req.body);
      if (error) {
         throw HttpError(400, error.message);
      }

      const { user, token } = await loginUserSrv(req.body);

      // if (!user.verify) throw HttpError(404, "User not verification!");

      res.user = user;

      res.status(200).json({
         token,
         user: {
            email: user.email,
         },
      });
   });

   logout = ctrlWrapper(async (req, res, next) => {
      const user = await logoutUserSrv(req.user.token);
      res.status(204).json();
   });

   register = ctrlWrapper(async (req, res) => {
      //Валидация
      // const { error } = await User.validate(req.body);
      // if (error) throw HttpError(400, error.message);

      //Проверка на уникальность Email
      //     const user = await User.findOne({ email: req.body.email });

      //     if (user) {
      //        return res.status(409).json({
      //           status: "error",
      //           code: 409,
      //           message: "Email is already in use",
      //           data: "Conflict",
      //        });
      //     }

      //     const { email } = await addUserSrv(req.body);

      //     res.status(201).json({
      //        user: {
      //           email,
      //        },
      //     });
      //  });

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

   current = ctrlWrapper(async (req, res, next) => {
      const { email, name, surname } = await currentUserSrv(req.user.token);

      res.status(200).json({
         name,
         surname,
         email,
      });
   });
}

module.exports = new UsersController();
