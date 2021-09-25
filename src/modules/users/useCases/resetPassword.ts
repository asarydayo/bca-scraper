import { Request, Response } from "express";
import UserRepository from "modules/users/repository";
import { user } from "modules/users/mapper";
import { success, fail, notFound } from "common/responses";

export default async function resetPassword(req: Request, res: Response) {
  try {
    var { id } = req.params;
    var data = await UserRepository.resetPassword(id);
    if (data) {
      return res.send(success(user(data)));
    }
    return res.status(404).send(notFound());
  } catch (error: any) {
    return res.status(500).send(fail(new Error(error)));
  }
}
