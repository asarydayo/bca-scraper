import { Request, Response } from "express";
import UserRepository from "modules/users/repository";
import { user } from "modules/users/mapper";
import { success, fail, notFound } from "common/responses";

export default async function update(req: Request, res: Response) {
  try {
    var { id } = req.params;
    const updated_user = {
      name: req.body.name,
      email: req.body.email,
      force_change: req.body.force_change || false,
      password: req.body.password ? req.body.password : null,
    };

    var data = await UserRepository.update(id, updated_user);
    if (data) {
      return res.send(success(user(data)));
    }
    return res.status(404).send(notFound());
  } catch (error: any) {
    return res.status(500).send(fail(new Error(error)));
  }
}
