const { buildSuccResp, buildErrResp } = require("../../middleware/utils");
const { getPaketLayananInDb } = require("./helpers");

const getPaketLayanan = async (req, res) => {
  try {
    const paketLayananId = req.params.id;
    const role = await getPaketLayananInDb(paketLayananId);
    res.status(200).json(role);
  } catch (error) {
    res.status(400).json(buildErrResp(null, error.message));
  }
};

module.exports = { getPaketLayanan };
