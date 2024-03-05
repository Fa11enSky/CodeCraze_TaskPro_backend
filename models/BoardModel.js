const { Schema, model } = require("mongoose");
const handleMongooseError = require("../middlewares/handleMongooseError");

const boardSchema = new Schema(
   {
      title: {
         type: String,
         required: [true, "Title for the board is required"],
      },
      icon: {
         type: String,
         enum: [
            "icon-project",
            "icon-star",
            "icon-loading",
            "icon-puzzle",
            "icon-container",
            "icon-lightning",
            "icon-colors",
            "icon-hexagon",
         ],
         default: "icon-project",
      },
      background: {
         type: String,
         default: null,
      },
      owner: {
         type: Schema.Types.ObjectId,
         ref: "user",
      },
   },
   { versionKey: false, timestamps: false }
);

boardSchema.post("save", handleMongooseError);

module.exports = model("board", boardSchema);
