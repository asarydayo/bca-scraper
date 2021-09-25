import { Request, Response } from "express";
import UserRepository from "modules/users/repository";
import { user } from "modules/users/mapper";
import { success, fail, notFound } from "common/responses";

export default async function destroy(req: Request, res: Response) {
  try {
    var { id } = req.params;

    var data = await UserRepository.destroy(id);
    if (data) {
      return res.send(success());
    }
    return res.status(404).send(notFound());
  } catch (error: any) {
    return res.status(500).send(fail(new Error(error)));
  }
}
