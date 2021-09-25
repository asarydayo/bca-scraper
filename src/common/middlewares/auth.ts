import { Request, Response, NextFunction } from "express";
import UserRepository from "modules/users/repository";
import * as jwt from "jsonwebtoken";
import config from "../../config/config";

import { fail, success } from "common/responses";
import { user } from "modules/users/mapper";
// import * as _ from "underscore";

/************************
 * SECTION Logic for JWT Checks
 ************************/
const checkJwt = async (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head

  const token = <string>req.headers.authorization;
  let jwtPayload;
  //Try to validate the token and get data
  try {
    // Validate the JWT
    jwtPayload = <any>jwt.verify(token, config.server.jwt_secret);
    res.locals.jwtPayload = jwtPayload;

    // Check if User Exists
    await UserRepository.getOneByID(jwtPayload.id)
      .then((userData: any) => {
        // return user with Roles and Perms to the next middleware
        res.locals.user = user(userData);
        return next();
      })
      .catch((err: any) => {
        // return 401 if user does not exist
        return res.status(401).send(fail(new Error(err), "user not Found!"));
      });
  } catch (error: any) {
    //If token is not valid, respond with 401 (unauthorized)
    return res.status(401).send(fail(error));
  }
};

export default checkJwt;
