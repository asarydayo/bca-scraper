import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "database";

const Users = sequelize.define(
  "users",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      primaryKey: true,
      comment: "Unique ID",
    },
    name: {
      type: DataTypes.STRING(250),
      allowNull: false,
      comment: "The first of the user.",
    },
    email: {
      type: DataTypes.STRING(250),
      allowNull: false,
      unique: false,
      comment: "Email used for logging in.",
    },
    password: {
      type: DataTypes.STRING(250),
      allowNull: false,
      unique: false,
    },
    reset_token: {
      type: DataTypes.STRING(250),
      allowNull: true,
      unique: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    modelName: "users",
    paranoid: true,
    freezeTableName: true,
    underscored: true,
    timestamps: true,
    deletedAt: "deleted_at",
  }
);

export default Users;
