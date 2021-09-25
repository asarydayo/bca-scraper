import { check } from "express-validator";
import CurrencyRepository from "modules/currency/repository";

export default [
  check("currency_code")
    .isString()
    .withMessage("Currency code must be a string.")
    .notEmpty()
    .withMessage("Currency code is required.")
    .trim()
    .escape(),
  check("currency_code").custom(async (value) => {
    return await CurrencyRepository.getOneByField("currency_code", value).then(
      (success) => {
        if (success) {
          return Promise.reject("Currency code already exist.");
        }
      }
    );
  }),
];
