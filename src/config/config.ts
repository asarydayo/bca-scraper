import dotenv from "dotenv";

dotenv.config();

const SERVER_HOST = process.env.SERVER_HOST || "localhost";
const SERVER_PORT = parseInt(<string>process.env.SERVER_PORT, 10) || 8000;

const DATABASE_USER = process.env.DATABASE_USER || "root";
const DATABASE_PASS = process.env.DATABASE_PASS || "";
const DATABASE_NAME = process.env.DATABASE_NAME || "ecs_sample";
const DATABASE_HOST = process.env.DATABASE_HOST || "localhost";
const DATABASE_TYPE = process.env.DATABASE_TYPE || "mysql";
const DATABASE_PORT = process.env.DATABASE_PORT || 3306;

const DATABASE_USER_TEST = process.env.DATABASE_USER_TEST || "root";
const DATABASE_PASS_TEST = process.env.DATABASE_PASS_TEST || "";
const DATABASE_NAME_TEST = process.env.DATABASE_NAME_TEST || "ecs_sample";
const DATABASE_HOST_TEST = process.env.DATABASE_HOST_TEST || "localhost";
const DATABASE_TYPE_TEST = process.env.DATABASE_TYPE_TEST || "mysql";
const DATABASE_PORT_TEST = process.env.DATABASE_PORT_TEST || 3306;

const DATABASE_USER_DEV = process.env.DATABASE_USER_DEV || "root";
const DATABASE_PASS_DEV = process.env.DATABASE_PASS_DEV || "";
const DATABASE_NAME_DEV = process.env.DATABASE_NAME_DEV || "ecs_sample";
const DATABASE_HOST_DEV = process.env.DATABASE_HOST_DEV || "localhost";
const DATABASE_TYPE_DEV = process.env.DATABASE_TYPE_DEV || "mysql";
const DATABASE_PORT_DEV = process.env.DATABASE_PORT_DEV || 3306;

const CLIENT_URL = process.env.CLIENT_URL || "*";
const BASE_URL = process.env.BASE_URL || "http://localhost:8000";
const IMAGE_BASE = process.env.BASE_URL || "http://localhost:8000";
const NODE_ENV = process.env.NODE_ENV || "DEVELOPMENT";
const JWT_SECRET = process.env.JWT_SECRET || "wgefohijnovewi24a";
const JWT_TIME = process.env.JWT_TIME || "12h";

const SERVICE_NAME = process.env.GMAIL_SERVICE_NAME;
const SERVICE_HOST = process.env.GMAIL_SERVICE_HOST;
const SERVICE_SECURE = process.env.GMAIL_SERVICE_SECURE;
const SERVICE_PORT = process.env.GMAIL_SERVICE_PORT;
const USER_NAME = process.env.GMAIL_USER_NAME;
const USER_PASSWORD = process.env.GMAIL_USER_PASSWORD;

const API_NAME = process.env.API_NAME || "Foobar";
const API_VERSION = process.env.API_VERSION || "v2";

const SERVER = {
  hostname: SERVER_HOST,
  port: SERVER_PORT,
  allowed: CLIENT_URL,
  jwt_secret: JWT_SECRET,
  jwt_time: JWT_TIME,
  base: BASE_URL,
  image_base: IMAGE_BASE,
  environment: NODE_ENV,
};

const MAIL = {
  service: SERVICE_NAME,
  host: SERVICE_HOST,
  secure: SERVICE_SECURE,
  port: SERVICE_PORT,
  user: USER_NAME,
  pass: USER_PASSWORD,
};

const DATABASE = {
  username: DATABASE_USER,
  password: DATABASE_PASS,
  name: DATABASE_NAME,
  host: DATABASE_HOST,
  dialect: DATABASE_TYPE,
  port: DATABASE_PORT,
  dialectOptions: { connectTimeout: 5000 },
};

const DATABASE_ENV: any = {
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
  DEFAULT: {
    username: DATABASE_USER,
    password: DATABASE_PASS,
    database: DATABASE_NAME,
    host: DATABASE_HOST,
    dialect: DATABASE_TYPE,
    port: DATABASE_PORT,
    dialectOptions: { connectTimeout: 5000 },
  },
};

const API = {
  name: API_NAME,
  version: API_VERSION,
};

const config: any = {
  server: SERVER,
  database: DATABASE,
  database_environment: DATABASE_ENV[SERVER.environment || "DEVELOPMENT"],
  api: API,
  mail: MAIL,
};

export default config;
