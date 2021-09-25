import express, { Application, Request, Response, NextFunction } from "express";
import config from "config/config";
import createServer from "server";

const startServer = () => {
  const app: Application = createServer();
  app.listen(config.server.port, config.server.hostname, () => {
    console.log(`SERVER RUNNING AT ${config.server.port}`);
  });
};

startServer();
