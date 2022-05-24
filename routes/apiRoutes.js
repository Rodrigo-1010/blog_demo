const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");

//ARTICLES
//Show all articles
router.get("/articles", apiController.indexArticles);

//Show article by UserId
router.get("/articles/user/:id", apiController.showByUserId);

//Show by title
router.get("/articles/:title", apiController.findArticleByTitle);

//Create article
router.post("/articles", apiController.createArticle);

//Update article
router.put("/articles/:id", apiController.updateArticle);

//Delete article
router.delete("articles/:id", apiController.deleteArticle);

//USERS
//Show all users
router.get("/users", apiController.indexUsers);

//Show user by ID
router.get("/users/:id");

//Create user
router.post("/users", apiController.createUser);

//Update user
router.put("/users:id", apiController.updateUser);

//Delete user
router.delete("/users/:id", apiController.deleteUser);

module.exports = router;
