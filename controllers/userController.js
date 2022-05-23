const { User } = require("../models");

// Display a listing of the resource.
async function index(req, res) {
  const users = await User.findAll({ order: [["createdAt", "DESC"]] });
  res.render("dashboard");
}

// Display the specified resource.
async function show(req, res) {}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {}

// Show the form for editing the specified resource.
async function edit(req, res) {
  const user = await User.findByPk(req.params.id);
  res.render("editUser", {
    user,
  });
}

// Update the specified resource in storage.
async function update(req, res) {
  const { userId, firstname, lastname, email, role } = req.body;
  const user = await User.findByPk(userId);
  user.set({
    firstname,
    lastname,
    email,
    role,
  });
  await user.save();
  res.redirect("/admin/dashboard");
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const user = await User.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.redirect("/admin/dashboard");
}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
};
