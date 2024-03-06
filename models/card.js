
const { Schema, models } = require("mongoose");
const handleMongooseError = require("../middlewares/handleMongooseError");

const cardSchema = new Schema(
    {
        title: {
            type: string,
            required: [true, "Set name for card title"],
        },
        description: {
            type: string,
            default: null,
        },
        label: {
            type: string,
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



