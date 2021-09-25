import { Request, Response } from "express";
import CurrencyRepository from "modules/currency/repository";
import { currency } from "modules/currency/mapper";
import { success as ok, fail } from "common/responses";

export default async function GetAll(req: Request, res: Response) {
  try {
    var paginate = {
      page:
        typeof req.query.page == "string" ? parseInt(req.query.page) || 1 : 1,
      per_page:
        typeof req.query.per_page == "string"
          ? parseInt(req.query.per_page) || 10
          : 10,
      search: req.query.search || "",
      paginated: req.query.paginated,
      with_exhchange: false,
    };

    await CurrencyRepository.getAll(paginate)
      .then((success) => {
        var result = {
          data: success.map((item: any) => currency(item)),
          meta: {
            page: paginate.page,
            per_page: paginate.per_page,
            search: paginate.search,
          },
        };
        return res.status(200).send(ok(result));
      })
      .catch((err) => {
        return res.status(500).send(fail(err));
      });
  } catch (error: any) {
    return res.status(500).send(fail(new Error(error)));
  }
}
