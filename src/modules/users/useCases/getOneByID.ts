import { Request, Response } from "express";
import UserRepository from "modules/users/repository";
import { user } from "modules/users/mapper";
import { success, fail } from "common/responses";

export default async function GetOneByID(req: Request, res: Response) {
  try {
    var { id } = req.params;
    return await UserRepository.getOneByID(id)
      .then((item) => {
        return res.send(success(user(item)));
      })
      .catch((err) => {
        return res.status(500).send(fail(new Error(err)));
      });
  } catch (error: any) {
    return res.status(500).send(fail(new Error(error)));
  }
}
