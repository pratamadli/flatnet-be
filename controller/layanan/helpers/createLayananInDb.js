const { buildErrResp, buildSuccResp } = require("../../../middleware/utils");
const { User, Pelanggan, Petugas, Layanan } = require("../../../models");
const bcrypt = require("bcryptjs");
const { getAuthInDb } = require("../../auth/helpers");

const createLayananInDb = (authId, { paketLayananId, waktuPemasangan }) => {
  return new Promise(async (resolve, reject) => {
    try {
      let authData = await getAuthInDb(authId);
      authData = authData.data;
      const pelangganId = authData.pelangganId;

      let data = {};
      const layanan = await Layanan.create({
        pelangganId,
        paketLayananId,
        status: "menunggu_verifikasi",
        waktuPemasangan,
        createdUserId: authId,
        updatedUserId: authId,
      });

      const dataValue = layanan?.dataValues;
      data = { ...dataValue };

      resolve(buildSuccResp(data, "Success Create Layanan"));
    } catch (error) {
      return reject(buildErrResp(null, error.message));
    }
  });
};

module.exports = { createLayananInDb };
