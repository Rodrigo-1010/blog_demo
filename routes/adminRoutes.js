const express = require("express");
const methodOverride = require("method-override");
const adminRouter = express.Router();
const articleController = require("../controllers/articleController");
const userController = require("../controllers/userController");
const { ROLE, authRole } = require("../auth_config");

adminRouter.use(methodOverride("_method"));
adminRouter.use(authRole(ROLE.ADMIN));

//Listar artículos en Admin
adminRouter.get("/dashboard", articleController.index);

//Mostrar página para crear artículo
adminRouter.get("/create", articleController.create);

//Agregar artículo nuevo
adminRouter.post("/create", articleController.store);

//Get del artículo a editar
adminRouter.get("/edit/:id", articleController.edit);

//Edit artículo
adminRouter.patch("/edit/:id", articleController.update);

//Eliminar artículo
adminRouter.delete("/:id", articleController.destroy);

//Edit user
adminRouter.get("/edit/user/:id", userController.edit);
adminRouter.patch("/edit/user/:id", userController.update);

//Delete user
adminRouter.delete("/delete/user/:id", userController.destroy);

module.exports = adminRouter;
