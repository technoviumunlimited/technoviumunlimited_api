require("../models/db");
const Level = require("../models/Level");

/**
 * /api/levels
 * GET all levels of all games
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
 * GET all levels of one game
 */

exports.getGameLevels = async (req, res) => {
  // let paramGameId = req.params.game_id;
  // let paramLimit = req.params.limit;

  var paramLimit = parseInt(req.params.limit);
  if (isNaN(paramLimit)) {
    console.log('not a number');
    paramLimit = 10;
  }
  else if (paramLimit < 0) {
    paramLimit = 10;
  }
  console.log(paramLimit);

  try {
    const levels = await Level.find({ game_id: req.params.game_id }).limit(paramLimit);
    res.json(levels);
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
};
