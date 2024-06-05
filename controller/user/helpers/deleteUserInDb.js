const { buildErrResp, buildSuccResp } = require("../../../middleware/utils");
const { User, Petugas, Pelanggan } = require("../../../models");

const { getAuthInDb } = require("../../auth/helpers");

const deleteUserInDb = (userId, id = null) => {
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

      const user = await User.findByPk(id);
      const value = user.dataValues;
      if (!user) {
        return reject(buildErrResp(null, "User not found"));
      }
      const data = await user.destroy();

      if (value.roleId === 2) {
        const petugas = await Petugas.findOne({ where: { userId: id } });
        if (petugas) {
          await petugas.destroy();
        }
      } else if (value.roleId === 3) {
        const pelanggan = await Pelanggan.findOne({ where: { userId: id } });
        if (pelanggan) {
          await pelanggan.destroy();
        }
      }

      resolve(buildSuccResp(data, "Success Delete User"));
    } catch (error) {
      return reject(buildErrResp(null, error.message));
    }
  });
};

module.exports = { deleteUserInDb };
