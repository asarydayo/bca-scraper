import { DataTypes } from "sequelize";
import sequelize from "database";

const Currency = sequelize.define(
  "currency",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Identifier",
    },
    currency_code: {
      type: DataTypes.STRING(250),
      allowNull: false,
      unique: true,
      comment: "Currency code.",
    },
    currency_symbol: {
      type: DataTypes.STRING(250),
      allowNull: true,
      default: null,
      unique: false,
      comment: "Currency symbol.",
    },
  },
  {
    modelName: "currency",
    paranoid: false,
    freezeTableName: true,
    underscored: true,
    timestamps: false,
  }
);

export default Currency;
