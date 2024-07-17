const express = require("express");
const app = express();
const cors = require("cors")
app.use(express.json())
app.use(cors())


const colorsController = require("./controllers/colorsController")

app.use("/colors", colorsController);

app.get("/",(req, res) => {
  res.send("Welcome to Colors App")
})


app.get("*", (req, res) => {
  res.status(404).json({msg:"Page not found"})
})
module.exports = app;