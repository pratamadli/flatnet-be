const { buildErrResp, buildSuccResp } = require("../../../middleware/utils");
const { User, Layanan, Pelanggan, PaketLayanan } = require("../../../models");

const getDashboardPelanggan = (authData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {};
      const pelangganId = authData.pelangganId;
      const paketLayanan = await PaketLayanan.findAll();
      const layanan = await Layanan.findAll({ where: { pelangganId } });

      data = { ...authData, paketLayanan, layanan };

      resolve(buildSuccResp(data, "Success Get Dashboard Pelanggan"));
    } catch (error) {
      return reject(buildErrResp(null, error.message));
    }
  });
};

module.exports = { getDashboardPelanggan };
