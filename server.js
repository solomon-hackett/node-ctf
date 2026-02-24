//imports
const express = require("express");
const app = express();

app.set("view engine", "ejs");

//import routers
const shopRouter = require("./routes/shop");
const accountRouter = require("./routes/account");

//home page
app.get("/", (req, res) => {
    res.render("index");
});

//routes
app.use("/shop", shopRouter);
app.use("/account", accountRouter);

app.listen(3000);
