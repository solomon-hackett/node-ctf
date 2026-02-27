//imports
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

//middlewares
const { auth } = require("../middlewares/auth");

isLoggedIn = false;

//routes
//main account page
router.get("/", auth, (req, res) => {
  res.render("account/account");
});

//register
router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: hashedPassword,
    });
    res.redirect("/account");
  } catch (err) {
    console.log(err);
    //Duplicate username
    if (err.code === 11000) {
      return res.render("account/login-register.ejs", {
        registerError: "Username already exists",
      });
    }

    // Validation error
    if (err.name === "ValidationError") {
      return res.render("account/login-register.ejs", {
        registerError: "Password must be at least 8 characters",
      });
    }

    // Fallback
    res.render("account/login-register.ejs", {
      registerError: "Something went wrong. Please try again.",
    });
  }
});

//Login
router.post("/login", async (req, res) => {
  //Find the user
  const user = await User.findOne({ username: req.body.username });
  //If user doesn't exist then send
  if (user == null) {
    return res.render("account/login-register.ejs", {
      loginError: "User does not exist, please register an account.",
    });
  }
  //Validate password
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("success");
    } else {
      res.send("password incorrct");
    }
  } catch (err){
    console.log(err)
    //If something goes wrong send server error
    res.status(500).send();
  }
});

module.exports = router;
