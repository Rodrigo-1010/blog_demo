const express = require("express");
const registerRouter = express.Router();
const { User } = require("../models");
const bcrypt = require("bcryptjs");

registerRouter.get("/", (req, res) => {
  res.render("register", { errorMessage: "" });
});

registerRouter.post("/", async (req, res) => {
  const user = await User.findOne({
    where: { email: req.body.email },
  });
  console.log(user);
  if (user !== null) {
    return res.render("register", { errorMessage: "mail already register" });
  }
  //Hasheando las password antes de crear el nuevo usuario
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  //Creando nuevo usuario con los datos ingresados por el usuario en el form
  const newUser = await User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: hashedPassword,
  });
  res.redirect("/login");
});

module.exports = registerRouter;
