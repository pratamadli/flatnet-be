const { buildSuccResp, buildErrResp } = require("../../middleware/utils");
const { createLayananInDb } = require("./helpers");

const createLayanan = async (req, res) => {
  const body = req.body;
  const userId = req.user.userId;
  try {
    const layanan = await createLayananInDb(userId, body);

    res.status(200).json(layanan);
  } catch (error) {
    res.status(400).json(buildErrResp(null, error.message));
  }
};

module.exports = { createLayanan };
