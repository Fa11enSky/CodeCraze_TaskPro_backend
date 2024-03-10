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
         enum: [
            null,
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
         ],
         default: null,
      },
      owner: {
         type: Schema.Types.ObjectId,
         ref: "user",
      },
   },
   { versionKey: false }
);

boardSchema.post("save", handleMongooseError);

module.exports = model("board", boardSchema);
