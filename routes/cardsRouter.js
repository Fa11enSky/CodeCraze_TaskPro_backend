const express = require("express");

const {
   addCard,
   // getCard,
   // updateCard,
   // deleteCard,
} = require("../controllers/cards");
const { protect, validateBody } = require("../middlewares");
const { addCardSchema } = require("../schemas");

const cardsRouter = express.Router();

cardsRouter.post("/:id", protect, validateBody(addCardSchema), addCard);
// .get("/:id", protect, getCard)
// .patch("/:id", protect, validateBody(updateCardSchema), updateCard)
// .delete("/:id", protect, deleteCard);

module.exports = cardsRouter;
