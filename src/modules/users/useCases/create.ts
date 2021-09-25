import { Request, Response } from "express";
import UserRepository from "modules/users/repository";
import { user } from "modules/users/mapper";
import { success, fail } from "common/responses";

export default async function create(req: Request, res: Response) {
  try {
    const new_recipe = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    await UserRepository.save(new_recipe)
      .then((ok: any) => {
        return res.status(200).send(success(user(ok.dataValues)));
      })
      .catch((err) => {
        return res.status(500).send(fail(err));
      });
  } catch (error: any) {
    return res.status(500).send(fail(new Error(error)));
  }
}
