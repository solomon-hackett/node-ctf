function auth(req, res, next) {
  if (isLoggedIn === "true") {
    next();
    return;
  }
  res.render("account/login-register");
}

module.exports = { auth };
