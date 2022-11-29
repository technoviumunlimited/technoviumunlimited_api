const mongoose = require("mongoose");
const valid = require("validator");

async function emailValidation(email) {
   if (!valid.isEmail(email)) { return false; }

   const user = await this.constructor.findOne({ email });
   if (user) { return false; }
}

async function isUsernameUnique(username) {
   const user = await this.constructor.findOne({ username });
   if (user) { return false; }
}

function isDate(date_of_birth) {
   if (!valid.isDate(date_of_birth)) { return false; }
}

const userSchema = new mongoose.Schema({
   firstname: {
      type: String,
      required: true,
      min: 2,
      max: 255,
      match: [/^[a-zA-Z]+$/, "Name can only contain letters"]
   },
   lastname: {
      type: String,
      required: true,
      min: 2,
      max: 255,
      match: [/^[a-zA-Z]+$/, "Name can only contain letters"]
   },
   username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^[a-zA-Z0-9]+$/, "username can only contain alphanumeric values"],
      min: 6,
      max: 32,
      unique: true,
      validate: {
         validator: isUsernameUnique,
         message: "Username already in use"
      }
   },
   email: {
      type: String,
      required: [true, "email adress is required"],
      lowercase: true,
      trim: true,
      match: [/^[a-zA-Z0-9@_.]+$/, "Invalid email characters"],
      min: 6,
      max: 46,
      unique: true,
      validate: {
         validator: emailValidation,
         message: "Email invalid or already in use"
      }
   },
   password: {
      type: String,
      required: true,
      trim: true,
      min: 6,
      max: 48
   },
   date_of_birth: {
      type: Date,
      required: true,
      match: [/^[0-9/-]+$/, "date can only contain /  and numbers"],
      validate: {
         validator: isDate,
         message: "Date is not formatted correctly"
      }
   },
   gender: {
      type: String,
      required: true,
      enum: {
         values: ['male', 'female', 'other'],
         message: '{VALUE} is not a valid option'
      }
   },
   status: {
      type: String,
      required: true,
   },
});

module.exports = mongoose.model("Users", userSchema);
