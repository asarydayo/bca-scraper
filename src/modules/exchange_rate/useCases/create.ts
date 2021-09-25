import { Request, Response } from "express";
import ExchangeRateRepository from "modules/exchange_rate/repository";
import CurrencyRepository from "modules/currency/repository";
import { exchangeRate } from "modules/exchange_rate/mapper";
import { success as ok, fail, notFound } from "common/responses";
import dayjs from "dayjs";
import { Op } from "sequelize";

export default async function create(req: Request, res: Response) {
  try {
    var new_exchange: any = {
      currency_id: req.body.symbol,
      e_rate_buy: req.body.e_rate.jual,
      e_rate_sell: req.body.e_rate.beli,
      tt_counter_buy: req.body.tt_counter.jual,
      tt_counter_sell: req.body.tt_counter.beli,
      bank_notes_buy: req.body.bank_notes.jual,
      bank_notes_sell: req.body.bank_notes.beli,
      date: dayjs(req.body.date).format("YYYY-MM-DD"),
    };

    // Check if currency exist
    var currency: any = await CurrencyRepository.getOneByField(
      "currency_code",
      new_exchange.currency_id
    );

    if (currency) {
      // Update currency id value
      new_exchange = { ...new_exchange, currency_id: currency.id };

      // Check if Exchange Exist
      var checkExist = await ExchangeRateRepository.checkIfExchangeExist(
        new_exchange
      );
      if (checkExist) {
        return res.status(400).send(fail("Exchange rate already exist."));
      }
    } else {
      // Create currency if doesn't Exist
      await CurrencyRepository.save({
        currency_code: new_exchange.currency_id,
      }).then((success: any) => {
        new_exchange = { ...new_exchange, currency_id: success.id };
      });
    }

    // Create the new Excange
    await ExchangeRateRepository.save(new_exchange)
      .then((success) => {
        return res.status(200).send(ok(exchangeRate(success)));
      })
      .catch((err) => {
        return res.status(500).send(fail(err));
      });
  } catch (error: any) {
    return res.status(500).send(fail(new Error(error)));
  }
}
