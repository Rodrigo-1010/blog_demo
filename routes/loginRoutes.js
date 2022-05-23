const express = require("express");
const router = express.Router();
const passport = require("passport");
const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/", (req, res) => {
  res.render("login");
});

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

//LOGOUT
router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

module.exports = router;
