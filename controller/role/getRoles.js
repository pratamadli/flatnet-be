const { buildErrResp } = require("../../middleware/utils");
const { getRolesInDb } = require("./helpers");

const getRoles = async (req, res) => {
  try {
    const role = await getRolesInDb();
    res.status(200).json(role);
  } catch (error) {
    res.status(400).json(buildErrResp(null, error.message));
  }
};

module.exports = { getRoles };
