const express = require("express");

const {
   addCard,
   updateCard,
   deleteCard,
   moveCard,
} = require("../controllers/cards");
const { protect, validateBody } = require("../middlewares");
const {
   addCardSchema,
   updateCardSchema,
   moveCardSchema,
} = require("../schemas");

const cardsRouter = express.Router();

cardsRouter
   .post("/:id", protect, validateBody(addCardSchema), addCard)
   .patch("/:id", protect, validateBody(updateCardSchema), updateCard)
   .delete("/:id", protect, deleteCard)
   .patch("/move/:id", protect, moveCard);

module.exports = cardsRouter;
