const { buildSuccResp, buildErrResp } = require("../../middleware/utils");
const { validasiLayananInDb } = require("./helpers");

const validasiLayanan = async (req, res) => {
  const body = req.body;
  const authId = req.user.userId;
  try {
    const user = await validasiLayananInDb(authId, body);

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(buildErrResp(null, error.message));
  }
};

module.exports = { validasiLayanan };
