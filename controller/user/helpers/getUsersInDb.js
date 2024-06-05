const { buildErrResp, buildSuccResp } = require("../../../middleware/utils");
const { User } = require("../../../models");

const { getAuthInDb } = require("../../auth/helpers");

const getUsersInDb = (userId, id = null) => {
  return new Promise(async (resolve, reject) => {
    try {
      let authData = await getAuthInDb(userId);
      authData = authData.data;

      const authRoleId = authData.roleId;

      if (authRoleId !== 1) {
        return reject(
          buildErrResp(
            null,
            "User don't have any authorization to access this feature"
          )
        );
      }

      let data = [];
      data = await User.findAll();

      if (id !== null) {
       
        data = data.filter((x) => x.id == id);
      }

      resolve(buildSuccResp(data, "Success Get User"));
    } catch (error) {
      return reject(buildErrResp(null, error.message));
    }
  });
};

module.exports = { getUsersInDb };
