const express = require("express");
const gameController = require("../controllers/gameController");
const router = express.Router();

router.get("/api/games/:id", gameController.getGame);

module.exports = router;
