const { createUserInDb } = require("./createUserInDb");
const { deleteUserInDb } = require("./deleteUserInDb");
const { getPelangganInDb } = require("./getPelangganInDb");
const { getPetugasInDb } = require("./getPetugasInDb");
const { getUsersInDb } = require("./getUsersInDb");
const { updateUserInDb } = require("./updateUserInDb");

module.exports = {
  createUserInDb,
  getUsersInDb,
  updateUserInDb,
  getPelangganInDb,
  getPetugasInDb,
  deleteUserInDb,
};
