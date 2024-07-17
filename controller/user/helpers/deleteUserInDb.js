const { buildErrResp, buildSuccResp } = require("../../../middleware/utils");
const { User, Petugas, Pelanggan, Layanan } = require("../../../models");

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

      if (value.roleId === 2) {
        const petugas = await Petugas.findOne({ where: { userId: id } });
        if (petugas) {
          console.log("PETUGAS", petugas);
          const petugasId = petugas.dataValues.petugasId;
          console.log("PETUGAS ID", petugasId);
          const layanan = await Layanan.findAll({
            where: { petugasId: petugasId },
          });
          if (layanan) {
            for (let i = 0; i < layanan.length; i++) {
              layanan[i].destroy();
            }
          }
          await petugas.destroy();
        }
      } else if (value.roleId === 3) {
        const pelanggan = await Pelanggan.findOne({ where: { userId: id } });
        if (pelanggan) {
          console.log("PELANGGAN", pelanggan);
          const pelangganId = pelanggan.dataValues.pelangganId;
          console.log("PELANGGAN ID", pelangganId);
          const layanan = await Layanan.findAll({
            where: { pelangganId: pelangganId },
          });
          if (layanan) {
            for (let i = 0; i < layanan.length; i++) {
              layanan[i].destroy();
            }
          }
          await pelanggan.destroy();
        }
      }

      const data = await user.destroy();

      resolve(buildSuccResp(data, "Success Delete User"));
    } catch (error) {
      return reject(buildErrResp(null, error.message));
    }
  });
};

module.exports = { deleteUserInDb };
