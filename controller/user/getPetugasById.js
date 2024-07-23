const { buildSuccResp, buildErrResp } = require("../../middleware/utils");
const { getPetugasInDb } = require("./helpers");

const getPetugasById = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.userId;
    const users = await getPetugasInDb(userId, id);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(buildErrResp(null, error.message));
  }
};

module.exports = { getPetugasById };
