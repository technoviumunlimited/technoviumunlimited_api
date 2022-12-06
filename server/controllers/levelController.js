require("../models/db");
const Level = require("../models/Level");

/**
 * /api/levels
 * GET all levels of all games
 */

exports.getLevels = async (req, res) => {
  let paramLimit = req.params.limit;

  if (paramLimit == undefined) {
    paramLimit = 10;
  }

  if (Number.isInteger(paramLimit)) {
    paramLimit = 10;
  }

  if (paramLimit > 100) {
    paramLimit = 100;
  }

  if (paramLimit < 1) {
    paramLimit = 1;
  }

  if (paramLimit == 0) {
    paramLimit = 10;
  }

  try {
    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const limit = parseInt(paramLimit) || 10;
    const result = {};
    const totalLevels = await Level.countDocuments().exec();
    let startIndex = pageNumber * limit;
    const endIndex = (pageNumber + 1) * limit;
    result.totalLevels = totalLevels;
    if (startIndex > 0) {
      result.previous = {
        pageNmber: pageNumber - 1,
        limit: limit,
      };
    }
    if (endIndex < (await Level.countDocuments().exec())) {
      result.next = {
        pageNumber: pageNumber + 1,
        limit: limit,
      };
    }
    result.data = await Level.find()
      .sort("-_id")
      .skip(startIndex)
      .limit(limit)
      .exec();
    result.rowsPerPage = limit;
    result.currentPage = pageNumber;
    return res.json({ msg: "Levels fetched successfully", data: result });

  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
};

/**
 * /api/levels/:game_id/:limit
 * GET all levels of one game
 */

exports.getGameLevels = async (req, res) => {
  var paramLimit = parseInt(req.params.limit);
  if (isNaN(paramLimit)) {
    console.log('not a number');
    paramLimit = 10;
  }
  else if (paramLimit < 0) {
    paramLimit = 10;
  }

  try {
    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const limit = parseInt(paramLimit) || 10;
    const result = {};
    const totalLevels = await Level.countDocuments().exec();
    let startIndex = pageNumber * limit;
    const endIndex = (pageNumber + 1) * limit;
    result.totalLevels = totalLevels;
    if (startIndex > 0) {
      result.previous = {
        pageNmber: pageNumber - 1,
        limit: limit,
      };
    }
    if (endIndex < (await Level.countDocuments().exec())) {
      result.next = {
        pageNumber: pageNumber + 1,
        limit: limit,
      };
    }
    result.data = await Level.find({ game_id: req.params.game_id })
      .sort("-_id")
      .skip(startIndex)
      .limit(limit)
      .exec();
    result.rowsPerPage = limit;
    result.currentPage = pageNumber;
    return res.json({ msg: "Game levels fetched successfully", data: result });
  }
  catch (err) {
    res.status(400).json({
      message: err,
    });
  }
};
