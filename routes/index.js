const publicRoutes = require("./publicRoutes");
const adminRoutes = require("./adminRoutes");
const loginRoutes = require("./loginRoutes");
const registerRoutes = require("./registerRoutes");
const writerRoutes = require("../routes/writerRoutes");
const editorRoutes = require("../routes/editorRoutes");
const isAuthenticated = require("../middleware/isAuthenticated");
const apiRoutes = require("./apiRoutes");

module.exports = (app) => {
  app.use("/", publicRoutes);
  app.use("/api", apiRoutes);
  app.use("/writer", isAuthenticated, writerRoutes);
  app.use("/editor", isAuthenticated, editorRoutes);
  app.use("/admin", isAuthenticated, adminRoutes);
  app.use("/login", loginRoutes);
  app.use("/register", registerRoutes);
};
