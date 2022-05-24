const express = require("express");
const router = express.Router();
const passport = require("passport");
const isAuthenticated = require("../middleware/isAuthenticated");
const { User } = require("../models");

router.get("/", (req, res) => {
  res.render("login");
});

router.post(
  "/",
  //  async (req, res) => {
  // const { email, password } = req.body;
  // let errors = [];

  // //Check if email already exists in DB
  // const user = await User.findOne({
  //   where: { email: req.body.email },
  // });
  // if (user !== null) {
  //   errors.push({ msg: "Email already registered." });
  //   return res.render("login", {
  //     errors,
  //     email,
  //     password,
  //   });
  // }

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
