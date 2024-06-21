const { buildErrResp } = require("../../middleware/utils");
const { getPaketLayananInDb } = require("./helpers");

const getPaketLayananAll = async (req, res) => {
  try {
    const paketLayanan = await getPaketLayananInDb();
    res.status(200).json(paketLayanan);
  } catch (error) {
    res.status(400).json(buildErrResp(null, error.message));
  }
};

module.exports = { getPaketLayananAll };
