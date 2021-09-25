import { IController } from "common/controller/baseController";
import { Op } from "sequelize";

export default class CurrencyRepository implements IController {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }

  public async getAll(req?: any) {
    const query: any = {
      include: [],
      where: {
        [Op.or]: {
          currency_symbol: {
            [Op.like]: `%${req.search}%`,
          },
          currency_code: {
            [Op.like]: `%${req.search}%`,
          },
        },
      },
    };

    if (req.paginated) {
      query.limit = req.per_page;
      query.offset = req.per_page * req.page - req.per_page;
    }

    if (req.with_exhchange) {
      query.include.push({
        model: this.models.ExchangeRate,
        as: "exchange_rate",
      });
    }

    return await this.models.Currency.findAll(query);
  }

  public async getOneByID(id: string) {
    return new Promise(async (resolve, reject) => {
      const query: any = {
        where: { id: id },
      };

      await this.models.Currency.findOne(query)
        .then((success: any) => {
          resolve(success);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  public async getOneByField(field: string, value: string) {
    return new Promise(async (resolve, reject) => {
      const query: any = {
        where: { [field]: value },
      };

      await this.models.Currency.findOne(query)
        .then((success: any) => {
          resolve(success);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  public async save(data: any) {
    return new Promise(async (resolve, reject) => {
      const new_currency: any = {
        currency_code: data.currency_code,
        currency_symbol: data.currency_symbol,
      };

      await this.models.Currency.create(new_currency)
        .then((success: any) => {
          resolve(success);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  public async update(id: string, data: any) {
    return new Promise(async (resolve, reject) => {
      const updated_currency: any = {
        currency_code: data.currency_code,
        currency_symbol: data.currency_symbol,
      };

      await this.models.Currency.update(updated_currency, { where: { id: id } })
        .then(async (success: any) => {
          resolve(await this.getOneByID(id));
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  public async destroy(id: string) {
    return new Promise(async (resolve, reject) => {
      await this.models.Currency.destroy({ where: { id: id } })
        .then((success: any) => {
          resolve(success);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  public async exist(id: string) {
    this.getOneByID(id)
      .then(() => true)
      .catch(() => false);
  }
}
