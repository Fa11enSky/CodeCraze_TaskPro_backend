const { HttpError } = require("../helpers");

const User = require("../models/UserModel");

const {
  loginUserSrv,
  logoutUserSrv,
  addUserSrv,
  currentUserSrv,
} = require("../services");

class UsersController {
  login = async (req, res, next) => {
    try {
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
    } catch (error) {
      next(error); //Ищем обработчик ОШИБОК  с 4мя параметрами из app.js
    }
  };

  logout = async (req, res, next) => {
    try {
       const user = await logoutUserSrv(req.user.token);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  };

  register = async (req, res, next) => {
    try {
      //Валидация
      const { error } = await User.validate(req.body);
      if (error) throw HttpError(400, error.message);

      //Проверка на уникальность Email
      const user = await User.findOne({ email: req.body.email });

      if (user) {
        return res.status(409).json({
          status: "error",
          code: 409,
          message: "Email is already in use",
          data: "Conflict",
        });
      }

      const { email } = await addUserSrv(req.body);

      res.status(201).json({
        user: {
          email,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  current = async (req, res, next) => {
    try {

      const { email, name, surname } = await currentUserSrv(req.user.token);

      res.status(200).json({
        name,
        surname,
        email,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new UsersController();
