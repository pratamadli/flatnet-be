const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const { buildSuccResp, buildErrResp } = require("../../middleware/utils");
const { updateUserInDb } = require("./helpers");

const updateUser = async (req, res) => {
  const body = req.body;
  const userId = req.user.userId;
  try {
    const user = await updateUserInDb(userId, body);

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(buildErrResp(null, error.message));
  }
};

module.exports = { updateUser };
