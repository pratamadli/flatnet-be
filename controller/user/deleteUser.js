const { buildSuccResp, buildErrResp } = require("../../middleware/utils");
const { deleteUserInDb } = require("./helpers");

const deleteUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const id = req.params.id;
    const users = await deleteUserInDb(userId, id);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(buildErrResp(null, error.message));
  }
};

module.exports = { deleteUser };
