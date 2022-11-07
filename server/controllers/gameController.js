require("../models/db");
const Game = require("../models/Games");

exports.getGame = async (req, res) => {
    let paramID = req.params.id;
    try {
        const game = await Game.findOne({id: paramID});
        res.json(game);
    } catch (err) {
        res.status(400).json({message: err});
    }
};
