const { buildSuccResp, buildErrResp } = require("../../middleware/utils");
const { getLayananInDb } = require("./helpers");

const getLayananFilter = async (req, res) => {
  try {
    const body = req.body;
    console.log("body",body );
    const layanan = await getLayananInDb(body);
    res.status(200).json(layanan);
  } catch (error) {
    res.status(400).json(buildErrResp(null, error.message));
  }
};

module.exports = { getLayananFilter };
