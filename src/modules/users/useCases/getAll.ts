import { Request, Response } from "express";
import UserRepository from "modules/users/repository";
import { user } from "modules/users/mapper";
import { success, fail } from "common/responses";

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
    };

    var data = await UserRepository.getAllPaginated(paginate);
    var result = {
      data: data.map((item: any) => user(item)),
      meta: {
        page: paginate.page,
        per_page: paginate.per_page,
        search: paginate.search,
      },
    };

    return res.status(200).send(success(result));
  } catch (error: any) {
    return res.status(500).send(fail(new Error(error)));
  }
}
