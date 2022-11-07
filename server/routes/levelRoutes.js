const express = require("express");
const router = express.Router();
const levelController = require("../controllers/levelController");

/**
 * Level routes
 */
router.get("/api/levels/:limit", levelController.getLevels);
router.get("/api/levels/:game_id", levelController.getGameLevels);

module.exports = router;
