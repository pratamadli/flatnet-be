const { buildErrResp, buildSuccResp } = require("../../../middleware/utils");
const { User, Layanan, Pelanggan, PaketLayanan } = require("../../../models");
const { getLayananInDb } = require("../../layanan/helpers");
const { getPaketLayananInDb } = require("../../paketLayanan/helpers");

const getDashboardPelanggan = (authData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {};
      const pelangganId = authData.pelangganId;
      let paketLayanan = await getPaketLayananInDb();
      paketLayanan = paketLayanan.data;
      let layanan = await getLayananInDb({ pelangganId });
      layanan = layanan.data;
      const latestLayanan = layanan
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 2);

      data = { ...authData, paketLayanan, latestLayanan };

      resolve(buildSuccResp(data, "Success Get Dashboard Pelanggan"));
    } catch (error) {
      return reject(buildErrResp(null, error.message));
    }
  });
};

module.exports = { getDashboardPelanggan };
