const { User } = require("../../models");
const bcrypt = require("bcryptjs");

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const register = async (req, res) => {
  const { email, password } = req.body;
  const roleId = 3; // Role ID for 'pelanggan'

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, roleId });
    console.log("USER REGISTER", user);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { register };
