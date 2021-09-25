import { check } from "express-validator";

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
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/
    )
    .withMessage(
      "Password requirement : Minimum 8 and maximum 32 characters, at least one uppercase letter, one lowercase letter, one number and one special character."
    ),
  check("password_conf").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    // Indicates the success of this synchronous custom validator
    return true;
  }),
  //   check("description").not().isEmpty().withMessage("Description is required"),
  //   check("description")
  //     .isLength({ min: 15 })
  //     .withMessage("Description must be at least 15 character"),
  //   check("steps").not().isEmpty().withMessage("Steps are required"),
  //   // Form-Data
  //   check("steps").isArray().withMessage("Steps Must be an array!"),
  //   check("ingredients_id").isArray().withMessage("Ingredient Must be an array!"),
  //   check("recipe_category_id")
  //     .not()
  //     .isEmpty()
  //     .withMessage("Category ID is required"),
];
