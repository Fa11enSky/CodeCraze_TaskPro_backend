
const { Schema, model } = require("mongoose");
const handleMongooseError = require("../middlewares/handleMongooseError");

const cardSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Set name for card title"],
        },
        description: {
            type: String,
            default: null,
        },
        label: {
            type: String,
            enum: ["without", "low", "medium", "high"],
      default: "without",
        },
        deadline: {
            type: Date,
            default: Date.now(),
        },
        cardOwner: {
            type: Schema.Types.ObjectId,
            ref: "column",
        },
    },
    { versionKey: false, timestamps: false }
);



cardSchema.post("save", handleMongooseError);

module.exports = model("card", cardSchema);