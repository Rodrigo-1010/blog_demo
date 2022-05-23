const passport = require("passport");
const LocalStrategy = require("passport-local");
const { User } = require("./models");
const bcrypt = require("bcryptjs");

//////////////  PASSPORT SETUP   //////////////////////////
function passportSetup() {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, async function verify(
      email,
      password,
      done
    ) {
      //consulta db

      const user = await User.findOne({
        where: { email: email },
      });
      if (!user) {
        return done(null, false, { message: "Email not register" });
      }
      const compare = await bcrypt.compare(password, user.password);
      if (compare) {
        return done(null, user);
      }
      return done(null, false, { message: "error in email or password" });
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    User.findByPk(id)
      .then((user) => {
        done(null, user); // Usuario queda disponible en req.user.
      })
      .catch((error) => {
        done(error, user);
      });
  });
}
///////////////////////////////////////////////////////////////////////

////AUTH MIDDLEWARE
function authRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.send("No tenes permisos para ingresar, raja de aca!");
    }
    next();
  };
}

module.exports = {
  ROLE: {
    READER: "reader",
    WRITER: "writer",
    EDITOR: "editor",
    ADMIN: "admin",
  },
  passportSetup,
  authRole,
};
