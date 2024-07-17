const { buildErrResp, buildSuccResp } = require("../../../middleware/utils");
const { User, Role } = require("../../../models");

const { getAuthInDb } = require("../../auth/helpers");
const { getRolesInDb } = require("../../role/helpers/getRolesInDb");

const getUsersInDb = (userId, id = null) => {
  return new Promise(async (resolve, reject) => {
    try {
      // let authData = await getAuthInDb(userId);
      // authData = authData.data;

      // const authRoleId = authData.roleId;

      // if (authRoleId !== 1) {
      //   return reject(
      //     buildErrResp(
      //       null,
      //       "User don't have any authorization to access this feature"
      //     )
      //   );
      // }

      let data = [];
      const usersData = await User.findAll();

      for (let i = 0; i < usersData.length; i++) {
        let detailData = usersData[i].dataValues;
        let roleData = await getRolesInDb(detailData.roleId);
        const roleName = roleData.data.dataValues.roleName;
        detailData.roleName = roleName;
        data.push(detailData);
      }

      if (id !== null) {
        data = data.filter((x) => x.userId == id);

        data = data[0] || {};
      }

      resolve(buildSuccResp(data, "Success Get User"));
    } catch (error) {
      return reject(buildErrResp(null, error.message));
    }
  });
};

module.exports = { getUsersInDb };
