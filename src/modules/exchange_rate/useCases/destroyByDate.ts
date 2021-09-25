import { Request, Response } from "express";
import ExchangeRateRepository from "modules/exchange_rate/repository";
import { exchangeRate } from "modules/exchange_rate/mapper";
import { success as ok, fail, notFound } from "common/responses";

import dayjs from "dayjs";

export default async function destroyByDate(req: Request, res: Response) {
  try {
    var { date } = req.params;
    var dates: any = {
      start: null,
      end: null,
    };

    if (dayjs(date).isValid()) {
      dates = {
        start: dayjs(date).format("YYYY-MM-DD 00:00:00"),
        end: dayjs(date).format("YYYY-MM-DD 23:59:59"),
      };
    } else {
      return res.status(422).send(fail("The date is Invalid"));
    }

    await ExchangeRateRepository.destroyByDate(dates)
      .then((success) => {
        if (success) {
          return res
            .status(200)
            .send(ok(`Successfully deleted ${success} data`));
        }
        return res.status(404).send(notFound("No data to be deleted"));
      })
      .catch((err) => {
        return res.status(500).send(fail(err));
      });
  } catch (error: any) {
    return res.status(500).send(fail(new Error(error)));
  }
}
