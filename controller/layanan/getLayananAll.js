const { buildErrResp } = require("../../middleware/utils");
const { getLayananInDb } = require("./helpers");

const getLayananAll = async (req, res) => {
  try {
    const paketLayanan = await getLayananInDb({});
    res.status(200).json(paketLayanan);
  } catch (error) {
    res.status(400).json(buildErrResp(null, error.message));
  }
};

module.exports = { getLayananAll };
