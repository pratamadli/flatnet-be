const { check, validationResult } = require("express-validator");

const loginValidation = [
  check("email").isEmail().withMessage("Email is invalid"),
  check("password").not().isEmpty().withMessage("Password cannot be empty"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  loginValidation,
};
