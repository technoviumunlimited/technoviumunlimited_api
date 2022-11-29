const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/api/" +process.env.API_VERSION+ "/users", userController.getAllUsers);
router.get("/api/" +process.env.API_VERSION+ "/user/:id", userController.getUser);
router.post("/api/" +process.env.API_VERSION+ "/user/signup", userController.createUser);

router.post("/api/user/login", userController.loginUser);

module.exports = router;
