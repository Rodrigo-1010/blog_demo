const { faker } = require("@faker-js/faker");
const { Article } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const articles = [];

  for (let i = 0; i < 30; i++) {
    articles.push({
      title: faker.lorem.sentence(5),
      content: faker.lorem.paragraphs(),
      image: "https://place-hold.it/500x200",
      userId: Math.random() * (10 - 1) + 1,
    });
  }

  // bulkcreate = crea todo en una llamada-unica conexion a la DB
  await Article.bulkCreate(articles);
  console.log("[Database] Se corrió el seeder de Articles.");
};
