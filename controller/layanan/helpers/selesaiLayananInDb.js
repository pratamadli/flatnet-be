const { buildErrResp, buildSuccResp } = require("../../../middleware/utils");
const { Layanan } = require("../../../models");
const { getAuthInDb } = require("../../auth/helpers");

const selesaiLayananInDb = (authId, { layananId, fileBukti }) => {
  return new Promise(async (resolve, reject) => {
    try {
      let authData = await getAuthInDb(authId);
      authData = authData.data;

      const authRoleId = authData.roleId;

      if (authRoleId !== 2) {
        return reject(
          buildErrResp(
            null,
            "User don't have any authorization to access this feature"
          )
        );
      }
      const layanan = await Layanan.findByPk(layananId);
      if (!layanan) {
        return reject(buildErrResp(null, "Layanan not found"));
      }

      const statusLayanan = layanan.dataValues.status;

      if (statusLayanan !== "terpasang") {
        return reject(
          buildErrResp(null, "Status layanan tidak sesuai. Harap hubungi admin")
        );
      }
      let data = {};
      layanan.fileBukti = fileBukti;
      layanan.status = "selesai";

      const updateLayanan = await layanan.save();

      const dataValue = updateLayanan?.dataValues;
      data = { ...dataValue };

      resolve(buildSuccResp(data, "Success Selesai Layanan"));
    } catch (error) {
      return reject(buildErrResp(null, error.message));
    }
  });
};

module.exports = { selesaiLayananInDb };
