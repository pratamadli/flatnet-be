const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const { buildSuccResp, buildErrResp } = require("../../middleware/utils");
const { createUserInDb } = require("./helpers");

const createUser = async (req, res) => {
  const body = req.body;
  const userId = req.user.userId;
  try {
    const user = await createUserInDb(userId, body);

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(buildErrResp(null, error.message));
  }
};

module.exports = { createUser };
