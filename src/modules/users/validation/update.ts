import { check } from "express-validator";
import userRepo from "modules/users/repository";

export default [
  check("name")
    .not()
    .isEmpty()
    .withMessage("Full name is required")
    .trim()
    .escape(),
  check("email").not().isEmpty().withMessage("Email is required"),
  check("email").isEmail().withMessage("Email is not a valid"),
  check("password")
    .optional()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/
    )
    .withMessage(
      "Password requirement : Minimum 8 and maximum 32 characters, at least one uppercase letter, one lowercase letter, one number and one special character."
    ),

  check("password_conf").custom((value, { req }) => {
    if (req.body.password) {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
    }

    return true;
  }),
];
