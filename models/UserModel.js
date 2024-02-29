const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { compare, genSalt, hash } = require("bcrypt");

const userSchema = new Schema(
  {
    // name: {
    //   type: String,
    //   // required: [true,"Set name for user"]
    // },
    // surname: {
    //   type: String,
    //   // required: [true,"Set surname for user"]
    // },
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
userSchema.post("save", (error, data, next) => {
  error.status = 400;
  next();
});

userSchema.methods.checkPassword = (candidate, passwordHash) =>
  compare(candidate, passwordHash);

const registerSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  token: Joi.string(),
});

const schema = { registerSchema, loginSchema };
const User = model("user", userSchema);

module.exports = User;

//module.exports = model("user", userSchema);
