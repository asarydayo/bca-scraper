import { check } from "express-validator";

export default [
  check("symbol")
    .isString()
    .withMessage("Symbol must be a string.")
    .notEmpty()
    .withMessage("Symbol is required.")
    .trim()
    .escape(),
  check("e_rate")
    .notEmpty()
    .withMessage("E-Rate is required.")
    .isObject()
    .withMessage("E-Rate must be an object"),
  check("e_rate.jual")
    .notEmpty()
    .withMessage("E-Rate sell is required.")
    .isDecimal()
    .withMessage("E-Rate buy must be in correct decimal format. eg: 12345.67"),
  check("e_rate.beli")
    .notEmpty()
    .withMessage("E-Rate buy is required.")
    .isDecimal()
    .withMessage("E-Rate buy must be in correct decimal format. eg: 12345.67"),
  check("tt_counter")
    .notEmpty()
    .withMessage("TT Counteris required.")
    .isObject()
    .withMessage("TT Counter must be an object"),
  check("tt_counter.jual")
    .notEmpty()
    .withMessage("TT Counter sell is required.")
    .isDecimal()
    .withMessage(
      "TT Counter buy must be in correct decimal format. eg: 12345.67"
    ),
  check("tt_counter.beli")
    .notEmpty()
    .withMessage("TT Counter buy is required.")
    .isDecimal()
    .withMessage(
      "TT Counter buy must be in correct decimal format. eg: 12345.67"
    ),
  check("bank_notes")
    .notEmpty()
    .withMessage("bank_notes is required.")
    .isObject()
    .withMessage("bank_notes must be an object"),
  check("bank_notes.jual")
    .notEmpty()
    .withMessage("bank_notes sell is required.")
    .isDecimal()
    .withMessage(
      "bank_notes buy must be in correct decimal format. eg: 12345.67"
    ),
  check("bank_notes.beli")
    .notEmpty()
    .withMessage("TT Counter buy is required.")
    .isDecimal()
    .withMessage(
      "bank_notes buy must be in correct decimal format. eg: 12345.67"
    ),
];
