const express = require("express");
var methodOverride = require("method-override");
const router = express.Router();
const { User, Article } = require("../models");
const { ROLE, authRole } = require("../auth_config");
const articleController = require("../controllers/articleController");

router.use(methodOverride("_method"));
router.use(authRole(ROLE.WRITER));

router.get("/dashboard", articleController.index);

router.get("/create", articleController.create);

router.post("/create", articleController.store);

router.get("/edit/:id", articleController.edit);

router.patch("/edit/:id", articleController.update);

router.delete("/:id", articleController.destroy);

module.exports = router;
