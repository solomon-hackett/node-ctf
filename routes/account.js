//imports
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");


//middlewares
const auth = require("../middlewares/auth");

isLoggedIn = false;

//routes
router.get("/", auth, (req, res) => {
  res.render("account/account");
});

router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User( {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: hashedPassword
    });
    await user.save().then(() => console.log("user saved"))
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

router.post("/login", async (req, res) => {
  const user = users.find((user) => (user.username = req.body.username));
  if (user == null) {
    return res.status(400).send("Cannot find user");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("success");
    } else {
      res.send("password incorrct");
    }
  } catch {
    res.status(500).send();
  }
});

module.exports = router;
