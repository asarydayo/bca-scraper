import { Request, Response } from "express";
import ExchangeRateRepository from "modules/exchange_rate/repository";
import CurrencyRepository from "modules/currency/repository";
import { success as ok, fail } from "common/responses";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import _ from "underscore";
import * as cheerio from "cheerio";
import axios from "axios";

export default async function create(req: Request, res: Response) {
  try {
    dayjs.extend(customParseFormat);
    const url = "https://www.bca.co.id/id/informasi/kurs";
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);
    const listItems = $(".m-table-kurs tbody tr");
    var finalData: any = [];
    listItems.each((idx, el) => {
      var row = $(el).children("td");
      var values: any = {
        date: dayjs(
          $(".o-kurs-refresh-description .refresh-date").text(),
          "DD MMMM YYYY hh:mm"
        ).format("YYYY-MM-DD"),
      };
      row.each((idx, elc) => {
        if (idx < 1) {
          values.currency_id = $(elc).children("span").children("p").text();
        } else {
          var ratetype: any = $(elc).children("p").attr("rate-type");
          var ratevalue: any = $(elc).children("p").text();
          ratetype = ratetype ? ratetype.toLowerCase() : null;
          ratevalue = ratevalue
            ? ratevalue.replace(".", "").replace(",", ".")
            : 0;
          switch (ratetype) {
            case "erate-buy":
              values.e_rate_buy = ratevalue;
              break;
            case "erate-sell":
              values.e_rate_sell = ratevalue;
              break;
            case "tt-buy":
              values.tt_counter_buy = ratevalue;
              break;
            case "tt-sell":
              values.tt_counter_sell = ratevalue;
              break;
            case "bn-buy":
              values.bank_notes_buy = ratevalue;
              break;
            case "bn-sell":
              values.bank_notes_sell = ratevalue;
              break;

            default:
              break;
          }
        }
      });
      finalData.push(values);
    });

    var insertData: any = await Promise.all(
      finalData.map(async (item: any) => {
        var currency: any = await CurrencyRepository.getOneByField(
          "currency_code",
          item.currency_id
        );

        if (currency) {
          var checkExist = await ExchangeRateRepository.checkIfExchangeExist({
            ...item,
            currency_id: currency.id,
          });
          if (checkExist) {
            return null;
          }
          return {
            ...item,
            currency_id: currency.id,
          };
        } else {
          var new_currency: any = await CurrencyRepository.save({
            currency_code: item.currency_id,
          });
          return {
            ...item,
            currency_id: new_currency.id,
          };
        }
      })
    );
    insertData = _.filter(insertData, (item) => item != null);
    await ExchangeRateRepository.bulkSave(insertData)
      .then((success: any) => {
        return res
          .status(200)
          .send(
            ok(
              success.length ? finalData : success,
              insertData.length ? "Update Success." : "No updates available."
            )
          );
      })
      .catch((err) => {
        return res.status(500).send(fail(err));
      });
  } catch (error: any) {
    return res.status(500).send(fail(new Error(error)));
  }
}
