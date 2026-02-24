//imports
const express = require("express");
const router = express();

//routes
router.get("/", (req, res) => {
  res.render("account/account");
});

module.exports = router;
