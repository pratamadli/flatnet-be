const { buildErrResp, buildSuccResp } = require("../../../middleware/utils");
const { Pelanggan } = require("../../../models");

const { getAuthInDb } = require("../../auth/helpers");

const getPelangganInDb = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pelanggan = await Pelanggan.findOne({ where: { userId: id } });
      let data = {};
      if (pelanggan) {
        data = pelanggan.dataValues || {};
      }

      resolve(buildSuccResp(data, "Success Get Pelanggan"));
    } catch (error) {
      return reject(buildErrResp(null, error.message));
    }
  });
};

module.exports = { getPelangganInDb };
