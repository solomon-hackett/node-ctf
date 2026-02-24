//imports
const express = require("express");
const app = express();

app.set("view engine", "ejs");

//import routers

//home page
app.get("/", (req, res) => {
  res.render("index");
});

//routes

app.listen(3000);
