const { buildSuccResp, buildErrResp } = require("../../middleware/utils");
const { getRolesInDb } = require("./helpers");

const getRole = async (req, res) => {
  try {
    const roleId = req.params.id;
    const role = await getRolesInDb(roleId);
    res.status(200).json(role);
  } catch (error) {
    res.status(400).json(buildErrResp(null, error.message));
  }
};

module.exports = { getRole };
