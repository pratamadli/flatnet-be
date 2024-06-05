const { User, Pelanggan } = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { buildSuccResp, buildErrResp } = require("../../middleware/utils");

/**
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user.id, roleId: user.roleId },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    const message = "Logged in successfully";

    const objToken = { token };

    const data = Object.assign(user.dataValues, objToken);

    res.status(200).json(buildSuccResp(data, message));
  } catch (error) {
    res.status(400).json(buildErrResp(null, error?.message));
  }
};

module.exports = { login };
