import { Request, Response } from "express";
import CurrencyRepository from "modules/currency/repository";
import { currency } from "modules/currency/mapper";
import { success as ok, fail, notFound } from "common/responses";

export default async function destroy(req: Request, res: Response) {
  try {
    var { id } = req.params;

    await CurrencyRepository.destroy(id)
      .then((success) => {
        if (success) {
          return res.status(200).send(ok(currency(success)));
        }
        return res.status(404).send(notFound());
      })
      .catch((err) => {
        return res.status(500).send(fail(err));
      });
  } catch (error: any) {
    return res.status(500).send(fail(new Error(error)));
  }
}
