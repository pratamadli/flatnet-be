/**
 * Logout function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const { buildSuccResp, buildErrResp } = require("../../middleware/utils");

const logout = (req, res) => {
  // Invalidate the token on the client side
  res.json(buildSuccResp(null, "Logged out successfully"));
};

module.exports = { logout };
