const { faker } = require("@faker-js/faker");
const { User } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const users = [];

  for (let i = 0; i < 11; i++) {
    users.push({
      firstname: faker.lorem.word(4),
      lastname: faker.lorem.word(4),
      email: faker.lorem.word(4) + "@word.com",
      password: faker.lorem.word(6),
    });
  }

  await User.bulkCreate(users);
  console.log("[Database] Se corrió el seeder de Users.");
};
