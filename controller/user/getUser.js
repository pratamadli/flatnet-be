const { buildSuccResp, buildErrResp } = require("../../middleware/utils");
const { getUsersInDb } = require("./helpers");

const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.userId;
    const users = await getUsersInDb(userId, id);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(buildErrResp(null, error.message));
  }
};

module.exports = { getUser };
