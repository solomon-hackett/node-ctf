//imports
const express = require("express");
const app = express();

//uses
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.set("view engine", "ejs");

//import routers
const shopRouter = require("./routes/shop");
const accountRouter = require("./routes/account");
const adminRouter = require("./routes/admin");

//home page
app.get("/", (req, res) => {
  res.render("index");
});

//routes
app.use("/shop", shopRouter);
app.use("/account", accountRouter);
app.use("/admin", adminRouter);

app.listen(3000);
