require("dotenv").config();

const express = require("express");
const routes = require("./routes");
const dbInitialSetup = require("./dbInitialSetup");
const APP_PORT = process.env.APP_PORT || 3000;
const app = express();

const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const { passportSetup } = require("./auth_config");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

passportSetup();

app.use(cors());
app.use(
  session({
    secret: "RodrigoRodrigo",
    resave: false, // Docs: "The default value is true, but using the default has been deprecated".
    saveUninitialized: false, // Docs: "The default value is true, but using the default has been deprecated".
  })
);
app.use(passport.session());

////////////

// middleware to make 'user' available to all templates
app.use(function (req, res, next) {
  if (req.session.userId !== undefined) {
    res.locals.role = req.user.role;
  } else {
    res.locals.role = null;
  }
  next();
});

routes(app);

// dbInitialSetup(); // Crea tablas e inserta datos de prueba.

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
