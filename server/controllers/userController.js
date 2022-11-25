require("../models/db");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const validator = require('validator');

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
   var errors = [];
   const { username, email, password, date_of_birth, gender } = req.body;

   if(!username) {
      var username_error = {'name' : 'username', 'status': '400', 'message' : 'Username is required.'};
      errors.push(username_error);
   } else if (!validator.isAlphanumeric(username)){
      var username_alphanumeric_error = {'name' : 'username_alphanumeric', 'status': '400', 'message' : 'Username needs to be combination of numbers and letters.'};
      errors.push(username_alphanumeric_error);
   } else if (!validator.isLength(username, {min:6, max: 8})){
      var username_min_max_length_error = {'name' : 'username_min_max_length', 'status': '400', 'message' : 'Username needs to be min 6 and max 8 characters.'};
      errors.push(username_min_max_length_error);
   }

   if(!email) {
      var email_error = {'name' : 'email', 'status': '400', 'message' : 'Email is required.'};
      errors.push(email_error);
   } else if (!validator.isEmail(email)) {
      var email_error = {'name' : 'email', 'status': '400', 'message' : 'The Email Address is Not a Well Formed E-mail address'};
      errors.push(email_error);
   }

   if(!password) {
      var password_error = {'name' : 'password', 'status': '400', 'message' : 'Password is required.'};
      errors.push(password_error);
   }else if (!validator.isLength(password, {min:6, max: 100})){
      var password_min_max_length_error = {'name' : 'password_min_max_length', 'status': '400', 'message' : 'Password needs to be min 6 and max 100 characters.'};
      errors.push(password_min_max_length_error);
   }

   if(!date_of_birth) {
      var date_of_birth_error = {'name' : 'date_of_birth', 'status': '400', 'message' : 'Date of birth is required.'};
      errors.push(date_of_birth_error);
   } else if (!validator.isDate(date_of_birth)) {
      var date_of_birth_format_error = {'name' : 'date_of_birth_format', 'status': '400', 'message' : 'Date of birth is not formated ex. YYYY/MM/DD.'};
      errors.push(date_of_birth_format_error);
   }

   if(!gender) {
      var gender_error = {'name' : 'gender', 'status': '400', 'message' : 'Gender is required.'};
      errors.push(gender_error);
   } else if (gender !== 'male' && gender !== 'female'){
      var gender_error_choose_from_options = {'name' : 'gender', 'status': '400', 'message' : 'You need to choose from male or female.'};
      errors.push(gender_error_choose_from_options);
   }

   
   const email_duplicate = await User.findOne({
      email: req.body.email
   }).exec();

   if (email_duplicate) {
      var username_duplicate_error = {'name' : 'email_duplicate', 'status': '403', 'message' : 'Email is already in use.'};
      errors.push(username_duplicate_error);
   }
   
   const username_duplicate = await User.findOne({
      username: req.body.username
   }).exec();

   if (username_duplicate) {
      var username_duplicate_error = {'name' : 'username_duplicate', 'status': '403', 'message' : 'Username is already in use.'};
      errors.push(username_duplicate_error);
   }

   if(errors.length > 0){
      return res.status(400).json([{ "message": "errors"}, errors]);
   }

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
