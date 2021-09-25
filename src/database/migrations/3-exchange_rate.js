"use strict";

/**
 * USER MIGRATION
 *
 *
 */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("exchange_rate", {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        comment: "Identifier",
      },
      currency_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "The currency of this exchange rate",
        references: {
          model: "currency",
          key: "id",
        },
        onDelete: "restrict",
      },
      e_rate_buy: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true,
        default: null,
        comment: "E-Rate buy value.",
      },
      e_rate_sell: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true,
        default: null,
        comment: "E-Rate sell value.",
      },
      tt_counter_buy: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true,
        default: null,
        comment: "TT Counter buy value.",
      },
      tt_counter_sell: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true,
        default: null,
        comment: "TT Counter sell value.",
      },
      bank_notes_buy: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true,
        default: null,
        comment: "Bank Notes buy value.",
      },
      bank_notes_sell: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true,
        default: null,
        comment: "Bank Notes sell value.",
      },
      date: {
        type: Sequelize.DATE,
        allowNull: true,
        default: null,
        comment: "The date of this data.",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // await queryInterface.dropTable("kurs");
  },
};
