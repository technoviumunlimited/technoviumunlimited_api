require("../models/db");
const User = require("../models/User");
const bcrypt = require("bcrypt");
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
      const users = await User.find({});
      res.json(users);

   } catch (err) {
      res.status(400).json({ message: err });
   }
}

/**
 * /api/user/signup/{username}
 * POST create new user
 */

exports.createUser = async (req, res) => {

   const hashedPass = await bcrypt.hash(req.body.password, 10);

   User.findOne({
      email: req.body.email
   })
   .exec((err,user) => {
      if(err){ return res.status(500).send({ message: err }); }
      if(user){ return res.status(403).send({ message: "Email is already in use." }); }
   });

   const newUser = new User({
      username: req.body.username,
      email: req.body.email.toLowerCase(),
      password: hashedPass,
      date_of_birth: req.body.date_of_birth,
      gender: req.body.gender,
      status: req.body.status
   });

   try {
      await newUser.save();
      res.json(newUser);
   } catch (err) {
      console.log(err.message);
      res.status(400).json({ message: err });
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

    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)

  try {
      refreshTokens.push(refreshToken)
      res.json({user, accessToken: accessToken, refreshToken: refreshToken})
  } catch (err) {
   console.log(err.message);
   res.status(400).json({ message: err });
  }
};

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}
