const { Article, User, Comment } = require("../models");
const { Op } = require("sequelize");

//Show all articles
async function indexArticles(req, res) {
  const articles = await Article.findAll({
    include: User,
    raw: true,
    order: [["createdAt", "DESC"]],
  });
  res.json(articles);
}

//Show all users
async function indexUsers(req, res) {
  const users = await User.findAll({
    raw: true,
    order: [["createdAt", "DESC"]],
  });
  res.json(users);
}

//Filter by Author(User)
async function showByUserId(req, res) {
  const articles = await Article.findAll({
    include: User,
    where: { userId: req.params.id },
    raw: true,
    order: [["createdAt", "DESC"]],
  });
  res.json(articles);
}

//Filter by word/letters
async function showByUserId(req, res) {
  const articles = await Article.findAll({
    where: {
      title: {
        [Op.substring]: [req.params.word],
      },
    },
    raw: true,
    order: [["createdAt", "DESC"]],
  });
  res.json(articles);
}

module.exports = {
  indexArticles,
  showByUserId,
  indexUsers,
};
