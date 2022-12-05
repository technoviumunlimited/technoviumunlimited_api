const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI, { useNewURLParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

// const db = mongoose.connection;
// admin authentication tutorial: https://www.bezkoder.com/node-js-mongodb-auth-jwt/
const db = {};

db.ROLES = ["student", "professor", "company" ,"admin"];

db.mongoose = mongoose;

db.user = require("./User.js");
db.role = require("./Roles.js");

db.mongoose.connection.on("error", console.error.bind(console, "connection error"));
db.mongoose.connection.once("open", async function (){
  console.log("connected");
  initRoles(db);
});

async function initRoles(db){
  db.role.estimatedDocumentCount(async function (err, count) {
    if(!err && count === 0){
        try
        {
            for(let i = 0; i < db.ROLES.length; i++)
            {
                let role = new db.role({
                        name: db.ROLES[i]
                    })
                await role.save();
            }
       } catch (creation_err) {
          console.log(creation_err.message);
       }
      
    }
  })
}

module.exports = db;
