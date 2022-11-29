require("../models/db");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const validator = require('validator');
const jwt = require('jsonwebtoken')
let refreshTokens = []

/**
 * /api/user/{id}
 * GET user based on id
 */

exports.getUser = async (req, res) => {
   let paramID = req.params.id;
   try {
      const user = await User.findOne({ _id: paramID });
      res.json(user);
   } catch (err) {
      res.status(400).json({ message: err });
   }
};

/** 
 * /api/user/all
 * GET all users returned
*/

exports.getAllUsers = async (req, res) => {

   try {
      const users = await User.find();
      res.json(users);

   } catch (err) {
      res.status(400).json({ message: err });
   }
}

/**
 * /api/user/signup/{username}
 * POST create new user
 * https://github.com/gitdagray/mongo_async_crud/blob/main/controllers/registerController.js
 */

exports.createUser = async (req, res) => {

   try {
      const hashedPass = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
         username:      req.body.username.toLowerCase(),
         email:         req.body.email.toLowerCase(),
         password:      hashedPass,
         date_of_birth: req.body.date_of_birth,
         gender:        req.body.gender,
         status:        "waiting_for_email_verification" // waiting_for_email_verification, live, deleted
      });

      await newUser.save();
      var return_message = {
         'message': 'success',
         'user_id': newUser._id
      }
      return res.json(return_message);

   } catch (err) {
      console.log(err.message);
      return res.status(400).json({ message: err });
   }
};

/**
 * /api/user/login/{username}
 * POST login user
 */

exports.loginUser = async (req, res) => {
  const user = User({
      id: req.body.id,
      email: req.body.email,
      password: req.body.password
    });
   var userToJson = user.toJSON();
    const accessToken = generateAccessToken(userToJson)
    const refreshToken = jwt.sign(userToJson, process.env.REFRESH_TOKEN_SECRET)

  try {
      refreshTokens.push(refreshToken)
      res.json({user, accessToken: accessToken, refreshToken: refreshToken})
  } catch (err) {
   console.log(err.message);
   res.status(400).json({ message: err });
  }
};

function generateAccessToken(user) {
  console.log(typeof process.env.ACCESS_TOKEN_SECRET);
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}
