import { check } from "express-validator";
import CurrencyRepository from "modules/currency/repository";

export default [
  check("currency_code")
    .isString()
    .notEmpty()
    .withMessage("Currency code is required")
    .trim()
    .escape(),
  check("currency_code").custom(async (value, body: any) => {
    return await CurrencyRepository.getOneByField("currency_code", value).then(
      (success: any) => {
        if (success) {
          if (success.id != body.req.params.id) {
            return Promise.reject("Currency code already exist.");
          }
        }
      }
    );
  }),
];
