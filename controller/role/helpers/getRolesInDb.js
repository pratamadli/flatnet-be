const { buildErrResp, buildSuccResp } = require("../../../middleware/utils");
const { Role } = require("../../../models");
const getRolesInDb = (roleId = null) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = [];

      data = await Role.findAll();

      if (roleId !== null) {
        data = data.filter((x) => x.roleId == roleId);

        data = data[0] || {};
      }

      resolve(buildSuccResp(data, "Success Get Role"));
    } catch (error) {
      return reject(buildErrResp(null, error.message));
    }
  });
};

module.exports = { getRolesInDb };
