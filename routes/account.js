//imports
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

//middlewares
const auth = require("../middlewares/auth");

const users = [];

isLoggedIn = false;

//routes
router.get("/", auth, (req, res) => {
  res.render("account/account");
});

router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: hashedPassword,
    };
    res.send(user);
    users.push(user);
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
