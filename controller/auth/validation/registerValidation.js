const { check, validationResult } = require("express-validator");
const { User, Pelanggan } = require("../../../models");
const { buildErrResp } = require("../../../middleware/utils");

const registerValidation = [
  check("email")
    .isEmail()
    .withMessage("Email is invalid")
    .custom(async (email) => {
      const user = await User.findOne({ where: { email } });
      if (user) {
        throw new Error("Email already in use");
      }
    }),
  check("password").not().isEmpty().withMessage("Password cannot be empty"),
  check("nik")
    .not()
    .isEmpty()
    .withMessage("NIK cannot be empty")
    .custom(async (nik) => {
      const user = await User.findOne({ where: { nik } });
      if (user) {
        throw new Error("NIK already in use");
      }
    }),
  check("nama").not().isEmpty().withMessage("Nama cannot be empty"),
  check("noTelp")
    .not()
    .isEmpty()
    .withMessage("No Telp cannot be empty")
    .custom(async (noTelp) => {
      const user = await User.findOne({ where: { noTelp } });
      if (user) {
        throw new Error("No Telp already in use");
      }
    }),
  check("alamat").not().isEmpty().withMessage("Alamat cannot be empty"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = errors.errors;
      const errorMessages = err.map((error) => error.msg);
      const errorMessageString = errorMessages.join(". ");
      return res.status(422).json(buildErrResp(errors, errorMessageString));
    }
    next();
  },
];

module.exports = {
  registerValidation,
};
