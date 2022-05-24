const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");

//Show all articles
router.get("/articles", apiController.indexArticles);

//Show all users
router.get("/users", apiController.indexUsers);

//Show by UserId
router.get("/:id", apiController.showByUserId);

//Show by word/letters
router.get("/search/:word", apiController.showByUserId);

module.exports = router;
