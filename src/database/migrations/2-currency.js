"use strict";

/**
 * USER MIGRATION
 *
 *
 */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("currency", {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        comment: "Identifier",
      },
      currency_code: {
        type: Sequelize.STRING(250),
        allowNull: false,
        unique: true,
        comment: "Currency code.",
      },
      currency_symbol: {
        type: Sequelize.STRING(250),
        allowNull: true,
        default: null,
        unique: false,
        comment: "Currency symbol.",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // await queryInterface.dropTable("kurs");
  },
};
