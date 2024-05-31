const { User } = require('../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


/**
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const login = async (req, res) => {
  const { email, password, apiKey } = req.body;

  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Invalid API key' });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id, roleId: user.roleId }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Logged in successfully', token, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { login };
