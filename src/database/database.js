require("dotenv").config();

const {
  DATABASE_PORT,
  DATABASE_HOST,
  DATABASE_USER,
  DATABASE_PASS,
  DATABASE_NAME,
  DATABASE_TYPE,

  DATABASE_PORT_TEST,
  DATABASE_HOST_TEST,
  DATABASE_USER_TEST,
  DATABASE_PASS_TEST,
  DATABASE_NAME_TEST,
  DATABASE_TYPE_TEST,

  DATABASE_PORT_DEV,
  DATABASE_HOST_DEV,
  DATABASE_USER_DEV,
  DATABASE_PASS_DEV,
  DATABASE_NAME_DEV,
  DATABASE_TYPE_DEV,
} = process.env;

const databaseCredentials = {
  DEVELOPMENT: {
    username: DATABASE_USER_DEV,
    password: DATABASE_PASS_DEV,
    database: DATABASE_NAME_DEV,
    host: DATABASE_HOST_DEV,
    dialect: DATABASE_TYPE_DEV,
    port: DATABASE_PORT_DEV,
    dialectOptions: { connectTimeout: 5000 },
  },
  TEST: {
    username: DATABASE_USER_TEST,
    password: DATABASE_PASS_TEST,
    database: DATABASE_NAME_TEST,
    host: DATABASE_HOST_TEST,
    dialect: DATABASE_TYPE_TEST,
    port: DATABASE_PORT_TEST,
    dialectOptions: { connectTimeout: 5000 },
  },
  PRODUCTION: {
    username: DATABASE_USER,
    password: DATABASE_PASS,
    database: DATABASE_NAME,
    host: DATABASE_HOST,
    dialect: DATABASE_TYPE,
    port: DATABASE_PORT,
    dialectOptions: { connectTimeout: 5000 },
  },
};

module.exports = databaseCredentials;
