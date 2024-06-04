const { login } = require("./login");
const { logout } = require("./logout");
const { register } = require("./register");
const { isAuthenticated } = require("./helpers");
const { getAuth } = require("./getAuth");

module.exports = {
  login,
  logout,
  register,
  isAuthenticated,
  getAuth,
};
