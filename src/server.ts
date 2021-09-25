import express, { Application, Request, Response, NextFunction } from "express";
import config from "config/config";
import logging from "config/logging";
import sequelize from "database";
import register from "database/register";
import cors from "cors";
import routes from "routes/index";

const NAMESPACE = "SERVER";
register();
sequelize.sync();
/**
 * An Instance of a Server
 */
export default function createServer() {
  const app: Application = express();

  if (config.server.environment == "DEVELOPMENT") {
    app.use((req: Request, res: Response, next: NextFunction) => {
      logging.info(
        NAMESPACE,
        `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`
      );
      res.on("finish", () => {
        logging.info(
          NAMESPACE,
          `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
        );
      });

      next();
    });
  }

  app.use(
    cors({
      origin: config.server.allowed,
    })
  );
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  /**
   * Cors
   */
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method == "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST PUT");
      return res.status(200).json({});
    }

    next();
  });
  app.use(`/api`, routes);

  app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error("NOT FOUND");

    return res.status(404).json({
      message: error.message,
    });
  });

  return app;
}
