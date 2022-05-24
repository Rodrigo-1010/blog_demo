const { Article, User, Comment } = require("../models");
const { Op } = require("sequelize");

//ARTICLES
//Show all articles
async function indexArticles(req, res) {
  const articles = await Article.findAll({
    raw: true,
    order: [["createdAt", "DESC"]],
  });
  res.json(articles);
}

//Filter by Author(User)
async function FindArticleByUserId(req, res) {
  const articles = await Article.findAll({
    where: { userId: req.params.id },
    raw: true,
    order: [["createdAt", "DESC"]],
  });
  res.json(articles);
}

//Filter by title
async function findArticleByTitle(req, res) {
  const articles = await Article.findAll({
    where: {
      title: {
        [Op.substring]: [req.params.title],
      },
    },
    raw: true,
    order: [["createdAt", "DESC"]],
  });
  res.json(articles);
}

//Create new article (with title and content)
async function createArticle(req, res) {
  if (!req.body.title || !req.body.content) {
    res.send("You need to provide a title and some content.");
  }

  const article = {
    title: req.body.title,
    content: req.body.content,
  };

  const newArticle = await Article.create(article);
  res.send("New article created!");
}

//Update article by ID
async function updateArticle(req, res) {
  if (!req.body.title || !req.body.content) {
    res.send("You need to provide a title and some content.");
  }

  const checkArticle = await Article.findByPk(req.params.id);

  if (checkArticle) {
    const updatedArticle = await Article.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.send(`Article with ID: ${req.params.id} successfully updated.`);
  } else {
    res.send("There's no article with that ID.");
  }
}

//Delete article
async function deleteArticle(req, res) {
  const checkArticle = await Article.findByPk(req.params.id);

  if (checkArticle) {
    const deletedArticle = await Article.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send(`Article with ID: ${req.params.id} successfully deleted.`);
  } else {
    res.send("There's no article with that ID.");
  }
}

//USERS
//Show all users
async function indexUsers(req, res) {
  const users = await User.findAll({
    raw: true,
    order: [["createdAt", "DESC"]],
  });
  res.json(users);
}

//Create new user
async function createUser(req, res) {
  if (
    !req.body.firstname ||
    !req.body.lastname ||
    !req.body.email ||
    !req.body.password
  ) {
    res.send(
      "You need to provide the following fields: firstname, lastname, email and password."
    );
  }
  const { firstname, lastname, email, password } = req.body;
  const user = {
    firstname,
    lastname,
    email,
    password,
  };

  const newUser = await User.create(user);
  res.send("New user created!");
}

//Update user by ID
async function updateUser(req, res) {
  const checkUser = await User.findByPk(req.params.id);

  if (checkUser) {
    const updatedUser = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.send(`User with ID: ${req.params.id} successfully updated.`);
  } else {
    res.send("There's no user with that ID.");
  }
}

//Delete user
async function deleteUser(req, res) {
  const checkArticle = await User.findByPk(req.params.id);

  if (checkArticle) {
    const udeletedUser = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send(`User with ID: ${req.params.id} successfully deleted.`);
  } else {
    res.send("There's no article with that ID.");
  }
}

module.exports = {
  indexArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  FindArticleByUserId,
  findArticleByTitle,
  indexUsers,
  createUser,
  updateUser,
  deleteUser,
};
