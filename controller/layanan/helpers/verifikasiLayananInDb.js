const { buildErrResp, buildSuccResp } = require("../../../middleware/utils");
const { Layanan } = require("../../../models");
const { getAuthInDb } = require("../../auth/helpers");

const verifikasiLayananInDb = (authId, { layananId, petugasId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      let authData = await getAuthInDb(authId);
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
      const layanan = await Layanan.findByPk(layananId);
      if (!layanan) {
        return reject(buildErrResp(null, "Layanan not found"));
      }

      const statusLayanan = layanan.dataValues.status;

      if (statusLayanan !== "menunggu_verifikasi") {
        return reject(
          buildErrResp(null, "Status layanan tidak sesuai. Harap hubungi admin")
        );
      }
      let data = {};
      layanan.petugasId = petugasId;
      layanan.status = "diverifikasi";

      const updateLayanan = await layanan.save();

      const dataValue = updateLayanan?.dataValues;
      data = { ...dataValue };

      resolve(buildSuccResp(data, "Success Verifiaksi Layanan"));
    } catch (error) {
      return reject(buildErrResp(null, error.message));
    }
  });
};

module.exports = { verifikasiLayananInDb };
