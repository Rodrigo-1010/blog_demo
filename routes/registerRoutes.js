const express = require("express");
const router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => {
  res.render("register", { errorMessage: "" });
});

router.post("/", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  let errors = [];

  //Check if email already exists in DB
  const user = await User.findOne({
    where: { email: req.body.email },
  });
  if (user !== null) {
    errors.push({ msg: "Email already registered." });
    return res.render("register", {
      errors,
      firstname,
      lastname,
      email,
      password,
    });
  }

  //Check required fields
  if (!firstname || !lastname || !email || !password) {
    errors.push({ msg: "Please fill in all fields." });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      firstname,
      lastname,
      email,
      password,
    });
  } else {
    //Hashing pass before creating new user
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    //Create new user in DB with form data
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    res.redirect("/login");
  }
});

module.exports = router;
