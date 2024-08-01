const { buildErrResp, buildSuccResp } = require("../../../middleware/utils");
const { PaketLayanan } = require("../../../models");
const getPaketLayananInDb = (paketLayananId = null) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = [];

      data = await PaketLayanan.findAll();

      data = data.sort((a, b) => a.hargaPaket - b.hargaPaket);

      if (paketLayananId !== null) {
        data = data.filter((x) => x.paketLayananId == paketLayananId);

        data = data[0] || {};
      }

      resolve(buildSuccResp(data, "Success Get Paket Layanan"));
    } catch (error) {
      return reject(buildErrResp(null, error.message));
    }
  });
};

module.exports = { getPaketLayananInDb };
