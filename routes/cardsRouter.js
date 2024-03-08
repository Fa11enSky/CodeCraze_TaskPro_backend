const express = require("express");

const { addCard, updateCard, deleteCard } = require("../controllers/cards");
const { protect, validateBody } = require("../middlewares");
const { addCardSchema, updateCardSchema } = require("../schemas");

const cardsRouter = express.Router();

cardsRouter
   .post("/:id", protect, validateBody(addCardSchema), addCard)
   .patch("/:id", protect, validateBody(updateCardSchema), updateCard)
   .delete("/:id", protect, deleteCard);

module.exports = cardsRouter;
