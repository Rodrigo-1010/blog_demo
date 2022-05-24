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

router.delete("/:id", async function destroy(req, res) {
  const article = await Article.findByPk(req.params.id);

  if (article && article.userId === req.user.id) {
    const article1 = await Article.destroy({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });
    res.redirect(`/${req.user.role}/dashboard`);
  } else {
    res.send("No puedes eliminar este articulo porque no te pertenece.");
  }
});

module.exports = router;
