import { Sequelize } from "sequelize";
import config from "config/config";

let sequelize: any;
sequelize = new Sequelize(
  config.database_environment.database,
  config.database_environment.username,
  config.database_environment.password,
  {
    //@ts-ignore
    dialect: config.database_environment.dialect,
    host: config.database_environment.host,
    logging: false,
    // logging: (message) => logging.info("DATABASE", message),

    pool: {
      max: 5,
      min: 0,
      acquire: 10000000,
      idle: 10000000,
    },
  }
);

// module.exports = sequelize;
export default sequelize;
