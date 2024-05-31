/**
 * Logout function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to logout" });
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully" });
  });
};

module.exports = { logout };
