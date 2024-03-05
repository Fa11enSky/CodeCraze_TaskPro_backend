const { Board } = require("../../models");
const { HttpError, ctrlWrapper } = require("../../helpers");

const addBoard = ctrlWrapper(async (req, res) => {
   const { _id: owner } = req.user;
   const { title } = req.body;

   const isBoardExists = await Board.findOne({ owner, title });
   if (isBoardExists) {
      throw HttpError(404, `Board "${title}" already exist`);
   }
   const result = await Board.create({ ...req.body, owner });
   res.status(201).json(result);
});

module.exports = addBoard;
