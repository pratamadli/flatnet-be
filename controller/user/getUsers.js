const { buildSuccResp, buildErrResp } = require("../../middleware/utils");
const { getUsersInDb } = require("./helpers");

const getUsers = async (req, res) => {
  try {
    const userId = req.user.userId;
    const users = await getUsersInDb(userId);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(buildErrResp(null, error.message));
  }
};

module.exports = { getUsers };
