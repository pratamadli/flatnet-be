const { User, Role } = require("../../models");
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
      { userId: user.userId, roleId: user.roleId },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    const message = "Logged in successfully";

    const objToken = { token };

    let data = Object.assign(user.dataValues, objToken);

    const roleId = data.roleId;

    const role = await Role.findByPk(roleId);

    const roleName = role.roleName;

    data = { ...data, roleName };

    res.status(200).json(buildSuccResp(data, message));
  } catch (error) {
    res.status(400).json(buildErrResp(null, error?.message));
  }
};

module.exports = { login };
