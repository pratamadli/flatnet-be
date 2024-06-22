const { buildSuccResp, buildErrResp } = require("../../middleware/utils");
const { tolakLayananInDb } = require("./helpers");

const tolakLayanan = async (req, res) => {
  const body = req.body;
  const authId = req.user.userId;
  try {
    const user = await tolakLayananInDb(authId, body);

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(buildErrResp(null, error.message));
  }
};

module.exports = { tolakLayanan };
