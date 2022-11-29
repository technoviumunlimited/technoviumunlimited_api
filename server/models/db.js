const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI, { useNewURLParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

// const db = mongoose.connection;
// admin authentication tutorial: https://www.bezkoder.com/node-js-mongodb-auth-jwt/
const db = {};

db.mongoose = mongoose;

db.user = require("./User.js");
db.role = require("./Roles.js");

db.mongoose.connection.on("error", console.error.bind(console, "connection error"));
db.mongoose.connection.once("open", () => {
  console.log("connected");
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;