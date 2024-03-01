const { HttpError } = require("../helpers");
const User = require("../models/UserModel");
const { signToken } = require("./jwtServices");

const getUserSrv = async (id) => User.findById(id);

async function currentUserSrv(token) {
   //Повертає об'єкт доданого юзера (з id).

   

   return user;
}

async function addUserSrv(userData) {
   //Повертає об'єкт доданого юзера (з id).
   const resAddDb = await User.create(userData);

   return resAddDb;
}

module.exports = {
   addUserSrv,
   loginUserSrv,
   logoutUserSrv,
   getUserSrv,
   currentUserSrv,
};
