import { Request, Response } from "express";
import ExchangeRateRepository from "modules/exchange_rate/repository";
import CurrencyRepository from "modules/currency/repository";
import { exchangeRate } from "modules/exchange_rate/mapper";
import { success as ok, fail, notFound } from "common/responses";

import dayjs from "dayjs";

export default async function update(req: Request, res: Response) {
  try {
    var id = req.params.id;
    var updated_exchange: any = {
      currency_id: req.body.symbol,
      e_rate_buy: req.body.e_rate.jual,
      e_rate_sell: req.body.e_rate.beli,
      tt_counter_buy: req.body.tt_counter.jual,
      tt_counter_sell: req.body.tt_counter.beli,
      bank_notes_buy: req.body.bank_notes.jual,
      bank_notes_sell: req.body.bank_notes.beli,
      date: dayjs(req.body.date).format("YYYY-MM-DD"),
    };

    // get the currency
    var currency: any = await CurrencyRepository.getOneByField(
      "currency_code",
      updated_exchange.currency_id
    );

    // update value
    updated_exchange = { ...updated_exchange, currency_id: currency.id };

    // Check if Exchange Exist
    var checkExist: any = await ExchangeRateRepository.checkIfExchangeExist(
      updated_exchange
    );

    if (checkExist) {
      id = checkExist.id;
    } else {
      return res.status(404).send(fail("Exchange rate not found."));
    }
    // Updated the exchange rate
    await ExchangeRateRepository.update(id, updated_exchange)
      .then((success) => {
        if (success) {
          return res.status(200).send(ok(exchangeRate(success)));
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
