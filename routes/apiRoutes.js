const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");
// const verifyToken = require("../middleware/verifyToken");
const { expressjwt: checkJwt } = require("express-jwt");

//JWT API - GET TOKEN
router.post("/token", apiController.login);

//Make sure request are authenticated
router.use(checkJwt({ secret: "secretkey", algorithms: ["HS256"] }));

//ARTICLES
//Show all articles
router.get("/articles", apiController.indexArticles);

//Show article by UserId
router.get("/articles/user/:id", apiController.findArticleByUserId);

//Show by title
router.get("/articles/:title", apiController.findArticleByTitle);

//Create article
router.post("/articles", apiController.createArticle);

//Update article
router.put("/articles/:id", apiController.updateArticle);

//Delete article
router.delete("/articles/:id", apiController.deleteArticle);

//USERS
//Show all users
router.get("/users", apiController.indexUsers);

//Show user by ID
router.get("/users/:id");

//Create user
router.post("/users", apiController.createUser);

//Update user
router.put("/users/:id", apiController.updateUser);

//Delete user
router.delete("/users/:id", apiController.deleteUser);

//COMMENTS
//Show all comments
router.get("/comments", apiController.indexComments);

// //Show comment by ID
// router.get("/comments/:id", apiController.findCommentById);

//Create comment
router.post("/comments", apiController.createComment);

//Update comment
router.put("/comments/:id", apiController.updateComment);

//Delete comment
router.delete("/comments/:id", apiController.deleteComment);

module.exports = router;
