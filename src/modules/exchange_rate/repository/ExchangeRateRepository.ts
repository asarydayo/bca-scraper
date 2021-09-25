import { IController } from "common/controller/baseController";

import { Op } from "sequelize";
import dayjs from "dayjs";

export default class ExchangeRateRepository implements IController {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }

  public async getAll(req?: any) {
    const query: any = {
      include: [
        {
          model: this.models.Currency,
          required: true,
          as: "currency",
          where: {
            currency_code: req.currency_code
              ? req.currency_code
              : { [Op.not]: null },
          },
        },
      ],
      where: {
        [Op.or]: {
          e_rate_buy: {
            [Op.like]: `%${req.search}%`,
          },
          e_rate_sell: {
            [Op.like]: `%${req.search}%`,
          },
          tt_counter_buy: {
            [Op.like]: `%${req.search}%`,
          },
          tt_counter_sell: {
            [Op.like]: `%${req.search}%`,
          },
          bank_notes_buy: {
            [Op.like]: `%${req.search}%`,
          },
          bank_notes_sell: {
            [Op.like]: `%${req.search}%`,
          },
        },
        date: {
          [Op.between]: [
            dayjs(req.dates.start).format("YYYY-MM-DD 00:00:00"),
            dayjs(req.dates.end).format("YYYY-MM-DD 23:59:59"),
          ],
        },
      },
    };

    if (req.paginated) {
      query.limit = req.per_page;
      query.offset = req.per_page * req.page - req.per_page;
    }

    return await this.models.ExchangeRate.findAll(query);
  }

  public async getOneByID(id: string) {
    return new Promise(async (resolve, reject) => {
      const query: any = {
        include: [
          {
            model: this.models.Currency,
            required: true,
            as: "currency",
          },
        ],
        where: { id: id },
      };

      await this.models.ExchangeRate.findOne(query)
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

      await this.models.ExchangeRate.findOne(query)
        .then((success: any) => {
          resolve(success);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  public async getOneByFields(object: any) {
    return new Promise(async (resolve, reject) => {
      const query: any = {
        where: { ...object },
      };

      await this.models.ExchangeRate.findOne(query)
        .then((success: any) => {
          resolve(success);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  public async checkIfExchangeExist(data: any) {
    return new Promise(async (resolve, reject) => {
      await this.getOneByFields({
        currency_id: data.currency_id,
        date: {
          [Op.between]: [
            dayjs(data.date).format("YYYY-MM-DD 00:00:00"),
            dayjs(data.date).format("YYYY-MM-DD 23:59:59"),
          ],
        },
      })
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
        currency_id: data.currency_id,
        e_rate_buy: data.e_rate_buy,
        e_rate_sell: data.e_rate_sell,
        tt_counter_buy: data.tt_counter_buy,
        tt_counter_sell: data.tt_counter_sell,
        bank_notes_buy: data.bank_notes_buy,
        bank_notes_sell: data.bank_notes_sell,
        date: data.date,
      };

      await this.models.ExchangeRate.create(new_currency)
        .then(async (success: any) => {
          resolve(await this.getOneByID(success.id));
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  public async bulkSave(data: any) {
    return new Promise(async (resolve, reject) => {
      await this.models.ExchangeRate.bulkCreate(data)
        .then(async (success: any) => {
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
        currency_id: data.currency_id,
        e_rate_buy: data.e_rate_buy,
        e_rate_sell: data.e_rate_sell,
        tt_counter_buy: data.tt_counter_buy,
        tt_counter_sell: data.tt_counter_sell,
        bank_notes_buy: data.bank_notes_buy,
        bank_notes_sell: data.bank_notes_sell,
        date: data.date,
      };

      await this.models.ExchangeRate.update(updated_currency, {
        where: { id: id },
      })
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
      await this.models.ExchangeRate.destroy({ where: { id: id } })
        .then((success: any) => {
          resolve(success);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  public async destroyByDate(date: any) {
    return new Promise(async (resolve, reject) => {
      await this.models.ExchangeRate.destroy({
        where: {
          date: {
            [Op.between]: [date.start, date.end],
          },
        },
      })
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
