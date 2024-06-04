const { buildErrResp, buildSuccResp } = require("../../middleware/utils");
const { User, Pelanggan, Petugas } = require("../../models");
const { getAuthInDb } = require("./helpers");

/**
 * getAuth function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const getAuth = async (req, res) => {
  try {
    const userId = req.user.userId;
    const data = await getAuthInDb(userId);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(buildErrResp(null, error.message));
  }
};

module.exports = { getAuth };
