require("../models/db");
const Level = require("../models/Level");

/**
 * /api/levels
 * GET all levels of the game
 */

exports.getLevels = async (req, res) => {
  let paramLimit = req.params.limit;

  if (paramLimit == 0) {
    paramLimit = 10;
  }

  try {
    const levels = await Level.find({}).limit(paramLimit);
    res.json(levels);
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
};

/**
 * /api/levels/:game_id
 * GET all levels of the game
 */

exports.getGameLevels = async (req, res) => {
  try {
    const levels = await Level.find({ game_id: req.params.game_id });
    res.json(levels);
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
};
