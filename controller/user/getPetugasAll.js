const { buildSuccResp, buildErrResp } = require("../../middleware/utils");
const { getPetugasInDb } = require("./helpers");

const getPetugasAll = async (req, res) => {
  try {
    const userId = req.user.userId;
    const petugas = await getPetugasInDb(userId);
    res.status(200).json(petugas);
  } catch (error) {
    res.status(400).json(buildErrResp(null, error.message));
  }
};

module.exports = { getPetugasAll };
