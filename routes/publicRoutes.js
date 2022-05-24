const express = require("express");
const publicRouter = express.Router();
const articleController = require("../controllers/articleController");
const passport = require("passport");
const { Comment } = require("../models");
const isAuthenticated = require("../middleware/isAuthenticated");

// ruta home
publicRouter.get("/", articleController.findAll);
// ruta id
publicRouter.get("/article/:id", articleController.showById);

publicRouter.post("/article/comment/:id", isAuthenticated, (req, res) => {
  Comment.create({
    content: req.body.commentContent,
    articleId: req.body.articleId,
    userId: req.user.id,
  });
  res.redirect(`/article/${req.body.articleId}`);
});

module.exports = publicRouter;
