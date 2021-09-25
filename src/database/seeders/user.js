"use strict";
const faker = require("faker");
const bcrypt = require("bcrypt");

const users = [...Array(15)].map((user, key) => ({
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  email: faker.internet.email(),
  password: bcrypt.hashSync("passWORD!23", 10),
}));

module.exports = {
  up: async (queryInterface, Sequelize) => {
    var data = [
      {
        name: `ADMIN`,
        email: `admin@gmail.com`,
        password: bcrypt.hashSync("passWORD!23", 10),
      },
      ...users,
    ];
    return await queryInterface.bulkInsert("users", data, {});
  },

  down: async (queryInterface, Sequelize) => {},
};
