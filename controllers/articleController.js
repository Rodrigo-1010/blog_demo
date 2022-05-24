const { Article, User, Comment } = require("../models");
const email = require("../email");
const formidable = require("formidable");
const path = require("path");

// find all
async function findAll(req, res) {
  const articles = await Article.findAll({
    include: User,
    order: [["createdAt", "DESC"]],
  });
  res.render("home", { articles });
}

//Show article by id
async function showById(req, res) {
  const article = await Article.findOne({
    include: User,
    where: {
      id: req.params.id,
    },
  });

  // look for comments
  const comments = await Comment.findAll({
    include: User,
    where: {
      articleId: req.params.id,
    },
    order: [["createdAt", "DESC"]],
  });
  console.log(comments);
  //Checking if comments for this specific article exist
  if (comments.length > 0) {
    res.render("article", { article, comments });
  } else {
    res.render("article", { article });
  }
}

//role-dependant-dashboard-listing
async function index(req, res) {
  //If user is writer, only display own articles. If editor/admin, display every article.
  if (req.user.role === "writer") {
    const articles = await Article.findAll({
      include: User,
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]],
    });
    res.render("writerDashboard", { articles });
  } else {
    const articles = await Article.findAll({
      include: User,
      order: [["createdAt", "DESC"]],
    });
    const users = await User.findAll({ order: [["createdAt", "DESC"]] });
    res.render("dashboard", { articles, users });
  }
}

// create
async function create(req, res) {
  res.render("create", {
    role: req.user.role,
  });
}

//store
async function store(req, res) {
  const form = formidable({
    multiples: false,
    uploadDir: path.join(__dirname, "../public/img"),
    keepExtensions: true,
  });

  form.parse(req, async function (err, fields, files) {
    const title = fields.title;
    const userId = req.user.id;
    const content = fields.content;
    const image = files.image.newFilename;

    Article.create({
      title,
      content,
      image,
      userId,
    });
    email();

    //REDIRECT DEPENDING ON ROLE
    if (req.user.role === "admin") {
      res.redirect("/admin/dashboard");
    } else if (req.user.role === "writer") {
      res.redirect("/writer/dashboard");
    } else if (req.user.role === "editor") {
      res.redirect("/editor/dashboard");
    }
  });
}

//edit
async function edit(req, res) {
  const article = await Article.findByPk(req.params.id, {
    include: User,
  });
  res.render("edit", {
    article,
    role: req.user.role,
  });
}

//update
async function update(req, res) {
  const { title, content, image, articleId } = req.body;
  const article = await Article.findByPk(articleId);
  article.set({
    title,
    content,
    image,
  });
  await article.save();
  res.redirect(`/${req.user.role}/dashboard`);
}

//delete
async function destroy(req, res) {
  const article = await Article.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.redirect(`/${req.user.role}/dashboard`);
}

module.exports = {
  findAll,
  showById,
  create,
  store,
  edit,
  update,
  destroy,
  index,
};
