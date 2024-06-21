const { buildErrResp, buildSuccResp } = require("../../../middleware/utils");
const { User, Layanan, Pelanggan } = require("../../../models");

const getDashboardPetugas = (authData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {};
      const petugasId = authData.petugasId;
      const totalLayanan = await Layanan.count();
      const totalLayananSelesai = await Layanan.count({
        where: { petugasId, status: "selesai" },
      });
      const totalLayananDiverifiaksi = await Layanan.count({
        where: { petugasId, status: "diverifikasi" },
      });

      const totalLayananPetugas = await Layanan.count({
        where: { petugasId },
      });

      const layananPetugas = await Layanan.findAll({ where: { petugasId } });

      data = {
        ...authData,
        totalLayanan,
        totalLayananSelesai,
        totalLayananDiverifiaksi,
        totalLayananPetugas,
        layananPetugas,
      };

      resolve(buildSuccResp(data, "Success Get Dashboard Petugas"));
    } catch (error) {
      return reject(buildErrResp(null, error.message));
    }
  });
};

module.exports = { getDashboardPetugas };
