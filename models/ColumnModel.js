const { Schema, model } = require("mongoose");
const handleMongooseError = require("../middlewares/handleMongooseError");

const columnSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title for the column is required"],
    },
    columnOwner: {
      type: Schema.Types.ObjectId,
      ref: "board",
    },
  },
  { versionKey: false }
);

columnSchema.post("save", handleMongooseError);

module.exports = model("column", columnSchema);
