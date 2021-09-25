import { DataTypes } from "sequelize";
import sequelize from "database";

const ExchangeRate = sequelize.define(
  "exchange_rate",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
      comment: "Identifier",
    },
    currency_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      comment: "The currency of this exchange rate",
      references: {
        model: "currency",
        key: "id",
      },
      onDelete: "restrict",
    },
    e_rate_buy: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
      default: null,
      comment: "E-Rate buy value.",
    },
    e_rate_sell: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
      default: null,
      comment: "E-Rate sell value.",
    },
    tt_counter_buy: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
      default: null,
      comment: "TT Counter buy value.",
    },
    tt_counter_sell: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
      default: null,
      comment: "TT Counter sell value.",
    },
    bank_notes_buy: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
      default: null,
      comment: "Bank Notes buy value.",
    },
    bank_notes_sell: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
      default: null,
      comment: "Bank Notes sell value.",
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
      default: null,
      comment: "The date of this data.",
    },
  },
  {
    modelName: "exchange_rate",
    paranoid: false,
    freezeTableName: true,
    underscored: true,
    timestamps: false,
  }
);

export default ExchangeRate;
