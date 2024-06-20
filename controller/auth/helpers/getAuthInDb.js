const { buildErrResp, buildSuccResp } = require("../../../middleware/utils");
const { User, Pelanggan, Petugas, Role } = require("../../../models");

const getAuthInDb = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("USER_ID", userId);
      const user = await User.findByPk(userId, {
        attributes: { exclude: ["password"] },
      });

      if (!user) {
        return reject(buildErrResp(null, "User not found"));
      }

      const roleId = user?.dataValues?.roleId;

      let data = { ...user?.dataValues };

      const role = await Role.findByPk(roleId);

      const roleName = role.roleName;

      data = {
        ...data,
        roleName,
      };

      if (roleId === 3) {
        let pelanggan = await Pelanggan.findOne({ where: { userId } });

        if (pelanggan) {
          pelanggan = pelanggan?.dataValues;
          data = {
            ...data,
            pelangganId: pelanggan?.pelangganId,
          };
        } else {
          return reject(buildErrResp(null, "Pelanggan not found"));
        }
      } else if (roleId === 2) {
        let petugas = await Petugas.findOne({ where: { userId } });

        if (petugas) {
          petugas = petugas?.dataValues;
          data = {
            ...data,
            petugasId: petugas?.petugasId,
          };
        } else {
          return reject(buildErrResp(null, "Petugas not found"));
        }
      }

      resolve(buildSuccResp(data, "Success Get Auth Data"));
    } catch (error) {
      return reject(buildErrResp(null, error.message));
    }
  });
};

module.exports = {
  getAuthInDb,
};
