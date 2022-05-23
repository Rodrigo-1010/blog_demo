const nodemailer = require("nodemailer");

function sendemail() {
  const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "3ead498bca6aa0",
      pass: "dcf7dec31f94a8",
    },
  });
  message = {
    from: "cleanblog@email.com",
    to: "admins@email.com",
    subject: "Nuevo artículo",
    text: "Se cargó nuevo artículo",
  };
  transporter.sendMail(message);
}

module.exports = sendemail;
