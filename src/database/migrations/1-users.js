"use strict";

/**
 * USER MIGRATION
 *
 *
 */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("users", {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(250),
        allowNull: false,
        comment: "The first name of the user.",
      },
      email: {
        type: Sequelize.STRING(250),
        allowNull: false,
        unique: false,
        comment: "Email used for logging in.",
      },
      password: {
        type: Sequelize.STRING(250),
        allowNull: false,
        unique: false,
        comment: "Password.",
      },
      reset_token: {
        type: Sequelize.STRING(250),
        allowNull: true,
        unique: true,
        comment:
          "The Reset password token. removed upon password change/success login.",
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
        allowNull: false,
        comment: "The date which the record was created.",
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: "The date which the record was last updated.",
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: "The date which the record was deleted.",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  },
};
