const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("dist"));

const userRoutes = require("./server/routes/userRoutes.js");
const levelRoutes = require("./server/routes/levelRoutes.js");
const gameRoutes = require("./server/routes/gameRoutes.js");
app.use("/", userRoutes, levelRoutes, gameRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
