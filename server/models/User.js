const mongoose = require("mongoose");

async function isEmailUnique(email) 
{
   const user = await this.constructor.findOne({email});
   if(user) { return false; }
}

async function isUsernameUnique(username) 
{
   const user = await this.constructor.findOne({username});
   if(user) { return false; }
}

const userSchema = new mongoose.Schema({
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
      validator: isEmailUnique,
      message: "Email adress already in use"
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    min: 6,
    max: 32
  },
  date_of_birth: {
    type: Date,
    required: true,
    match: [/^[0-9/]+$/, "date can only contain /  and numbers"]
  },
  gender: {
    type: String,
    required: true,
    enum:{
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
