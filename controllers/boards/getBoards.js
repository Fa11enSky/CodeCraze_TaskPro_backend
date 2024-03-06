const { Board } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const getBoards = ctrlWrapper(async (req, res) => {
   const { _id: owner } = req.user;

   const result = await Board.find({ owner });
   res.json(result);
});

module.exports = getBoards;
