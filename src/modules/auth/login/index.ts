import UserRepository from "modules/users/repository";
import { Request, Response } from "express";
import { success, fail } from "common/responses";
import { user as userMap } from "modules/users/mapper";
import config from "config/config";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function login(req: Request, res: Response) {
  try {
    var { email, password } = req.body;

    var user = await UserRepository.getOneByEmail(email).then((user) => {
      return user;
    });
    var passwordCheck = bcrypt.compareSync(password, user.password);
    if (!passwordCheck) {
      return res
        .status(403)
        .send(fail([], "Incorrect email/password combination."));
    }

    var token = jwt.sign(userMap(user), config.server.jwt_secret, {
      expiresIn: config.server.jwt_time,
    });

    return res.status(200).send(success({ ...userMap(user), token: token }));
  } catch (error: any) {
    return res.status(500).send(fail(new Error(error)));
  }
}
