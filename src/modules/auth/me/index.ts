import UserRepository from "modules/users/repository";
import { Request, Response } from "express";
import { success, fail } from "common/responses";
import { user as userMap } from "modules/users/mapper";
import config from "config/config";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function login(req: Request, res: Response) {
  try {
    var { user } = res.locals;
    return await UserRepository.getOneByID(user.id).then(async (user) => {
      if (!user) {
        return res
          .status(404)
          .send(fail(null, "Incorrect email/password combnination."));
      }
      var token = jwt.sign(userMap(user), config.server.jwt_secret, {
        expiresIn: config.server.jwt_time,
      });
      return res.status(200).send(success({ ...userMap(user), token: token }));
    });
  } catch (error: any) {
    return res.status(500).send(fail(new Error(error)));
  }
}
