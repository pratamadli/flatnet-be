const { createUser } = require("./createUser");
const { deleteUser } = require("./deleteUser");
const { getPetugasAll } = require("./getPetugasAll");
const { getPetugasById } = require("./getPetugasById");
const { getUser } = require("./getUser");
const { getUsers } = require("./getUsers");
const { updateUser } = require("./updateUser");

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getPetugasAll,
  getPetugasById,
};
