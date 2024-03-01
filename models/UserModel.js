const { Schema, model } = require("mongoose");
const { compare, genSalt, hash } = require("bcrypt");
// const { handleMongooseError } = require("../middlewares");
const handleMongooseError = require('../middlewares/handleMongooseError')

const userSchema = new Schema(
   {
      name: {
         type: String,
         required: [true, "Set name for user"],
      },
      email: {
         type: String,
         required: [true, "Email is required"],
         unique: true,
      },
      password: {
         type: String,
         required: [true, "Set password for user"],
      },

      token: { type: String },
   },
   { versionKey: false, timestamps: true }
);

userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) return next();

   const salt = await genSalt(10);
   this.password = await hash(this.password, salt);

   next();
});

//Для обработки ошибок валидации схемы и изменения статуса ошибки с 500 на 400
userSchema.post("save", handleMongooseError);

userSchema.methods.checkPassword = (candidate, passwordHash) =>
   compare(candidate, passwordHash);

// const User = model("user", userSchema);

module.exports =  model("user", userSchema) ;
