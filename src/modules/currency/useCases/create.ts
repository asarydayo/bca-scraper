import { Request, Response } from "express";
import CurrencyRepository from "modules/currency/repository";
import { currency } from "modules/currency/mapper";
import { success as ok, fail } from "common/responses";

export default async function create(req: Request, res: Response) {
  try {
    const new_currency = {
      currency_code: req.body.currency_code,
      currency_symbol: req.body.currency_symbol,
    };

    await CurrencyRepository.save(new_currency)
      .then((success) => {
        return res.status(200).send(ok(currency(success)));
      })
      .catch((err) => {
        return res.status(500).send(fail(err));
      });
  } catch (error: any) {
    return res.status(500).send(fail(new Error(error)));
  }
}
