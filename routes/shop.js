//imports
const express = require("express");
const router = express();

//routes
router.get("/", (req, res) => {
  res.render("shop/shop");
});

module.exports = router;
