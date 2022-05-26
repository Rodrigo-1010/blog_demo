const { Article, User, Comment } = require("../models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function login(req, res) {
  //If no email or password was provided, return a msg
  if (!req.body.email || !req.body.password) {
    return res.json({
      msg: "You need to provide an email and password to log in.",
    });
  }

  //If credentials were provided, then check database for user that matches
  const { email, password } = req.body;
  const user = await User.findOne({
    where: { email },
  });

  //If user was found, then sign token
  if (user) {
    //Check if user is admin
    if (user.role !== "admin") {
      return res.json({
        msg: "Only admins can generate tokens.",
      });
    } else {
      const passCheck = await bcrypt.compare(password, user.password);
      if (passCheck) {
        const token = await jwt.sign({ user }, "secretkey");
        res.json({ token });
      } else {
        res.json({ msg: "Incorrect password." });
      }
    }
  } else {
    res.json({ msg: "No user was found with these credentials." });
  }
}

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
async function findArticleByUserId(req, res) {
  const articles = await Article.findAll({
    where: { userId: req.params.id },
    raw: true,
    order: [["createdAt", "DESC"]],
  });
  res.json(articles);
}

//Filter by title
async function findArticleByTitle(req, res) {
  const title = req.query.title;
  const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  const articles = await Article.findAll({
    where: condition,
    raw: true,
    order: [["createdAt", "DESC"]],
  });
  res.json(articles);
}

//Create new article (with title and content)
async function createArticle(req, res) {
  if (!req.body.title || !req.body.content) {
    res.json({ msg: "You need to provide a title and some content." });
  } else {
    const article = {
      title: req.body.title,
      content: req.body.content,
    };
    const newArticle = await Article.create(article);
    res.json({ msg: "New article created!" });
  }
}

//Update article by ID
async function updateArticle(req, res) {
  const checkArticle = await Article.findByPk(req.params.id);

  if (!req.body.title || !req.body.content) {
    res.json({ msg: "You need to provide a title and some content." });
  } else if (checkArticle) {
    const updatedArticle = await Article.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      msg: `Article with ID: ${req.params.id} successfully updated.`,
    });
  } else {
    res.json({ msg: "There's no article with that ID." });
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
    res.json({
      msg: `Article with ID: ${req.params.id} successfully deleted.`,
    });
  } else {
    res.json({ msg: "There's no article with that ID." });
  }
}

//USERS
//Show all users
async function indexUsers(req, res) {
  const users = await User.findAll({
    raw: true,
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
    res.json({
      msg: "You need to provide the following fields: firstname, lastname, email and password.",
    });
  }
  const { firstname, lastname, email, password } = req.body;
  const user = {
    firstname,
    lastname,
    email,
    password,
  };

  const newUser = await User.create(user);
  res.json({ msg: "New user created!" });
}

//Update user by ID
async function updateUser(req, res) {
  const checkUser = await User.findByPk(req.params.id);

  if (
    !req.body.firstname ||
    !req.body.lastname ||
    !req.body.email ||
    !req.body.password
  ) {
    res.json({
      msg: "You need to provide the following fields: firstname, lastname, email and password.",
    });
  } else if (checkUser) {
    const updatedUser = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({ msg: `User with ID: ${req.params.id} successfully updated.` });
  } else {
    res.json({ msg: "There's no user with that ID." });
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
    res.json({ msg: `User with ID: ${req.params.id} successfully deleted.` });
  } else {
    res.json({ msg: "There's no user with that ID." });
  }
}

//COMMENTS
//Show all comments
async function indexComments(req, res) {
  const comments = await Comment.findAll({
    raw: true,
    order: [["createdAt", "DESC"]],
  });
  res.json(comments);
}

//Create new comment
async function createComment(req, res) {
  if (!req.body.content) {
    res.json({
      msg: "You need to provide content.",
    });
  } else {
    const comment = { content: req.body.content };
    const newComment = await Comment.create(comment);
    res.json({ msg: "New comment created!" });
  }
}

//Update comment by ID
async function updateComment(req, res) {
  const checkComment = await Comment.findByPk(req.params.id);

  if (!req.body.content) {
    res.json({
      msg: "You need to provide content.",
    });
  } else if (checkComment) {
    const updatedComment = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      msg: `Comment with ID: ${req.params.id} successfully updated.`,
    });
  } else {
    res.json({ msg: "There's no comment with that ID." });
  }
}

//Delete comment
async function deleteComment(req, res) {
  const checkComment = await Comment.findByPk(req.params.id);

  if (checkComment) {
    const udeletedUser = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      msg: `Comment with ID: ${req.params.id} successfully deleted.`,
    });
  } else {
    res.json({ msg: "There's no comment with that ID." });
  }
}

module.exports = {
  login,
  indexArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  findArticleByUserId,
  findArticleByTitle,
  indexUsers,
  createUser,
  updateUser,
  deleteUser,
  indexComments,
  createComment,
  updateComment,
  deleteComment,
};
