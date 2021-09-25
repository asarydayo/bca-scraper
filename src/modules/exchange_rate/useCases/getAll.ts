import { Request, Response } from "express";
import ExchangeRateRepository from "modules/exchange_rate/repository";
import { exchangeRate } from "modules/exchange_rate/mapper";
import { success as ok, fail } from "common/responses";

import dayjs from "dayjs";

export default async function GetAll(req: Request, res: Response) {
  try {
    var { kurs } = req.params;

    var paginate: any = {
      page:
        typeof req.query.page == "string" ? parseInt(req.query.page) || 1 : 1,
      per_page:
        typeof req.query.per_page == "string"
          ? parseInt(req.query.per_page) || 10
          : 10,
      search: req.query.date || "",
      currency_code: kurs || null,
      paginated: req.query.paginated,
    };

    var dates: any = {
      end: req.query.enddate,
      start: req.query.startdate,
    };

    if (dayjs(dates.start).isValid()) {
      dates.start = dayjs(dates.start).format("YYYY-MM-DD 00:00:01");
    } else {
      return res.status(422).send(fail("The start date is Invalid"));
    }

    if (dayjs(dates.end).isValid()) {
      dates.end = dayjs(dates.end).format("YYYY-MM-DD 23:59:59");
    } else {
      return res.status(422).send(fail("The end date is Invalid"));
    }

    paginate = { ...paginate, dates: dates };

    await ExchangeRateRepository.getAll(paginate)
      .then((success) => {
        var result: any = {
          data: success.map((item: any) => exchangeRate(item)),
          meta: {
            search: paginate.search,
            start_date: dates.start,
            end_date: dates.end,
          },
        };

        if (paginate.paginated) {
          result.meta = {
            ...result.meta,
            page: paginate.page,
            per_page: paginate.per_page,
          };
        }
        return res.status(200).send(ok(result));
      })
      .catch((err) => {
        return res.status(500).send(fail(err));
      });
  } catch (error: any) {
    return res.status(500).send(fail(new Error(error)));
  }
}
