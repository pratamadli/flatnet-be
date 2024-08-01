const {
  buildErrResp,
  buildSuccResp,
  buildErrObject,
} = require("../../../middleware/utils");
const { User, Pelanggan, Petugas, Layanan } = require("../../../models");
const bcrypt = require("bcryptjs");
const { getAuthInDb } = require("../../auth/helpers");
const { getLayananInDb } = require("./getLayananInDb");

const createLayananInDb = (authId, { paketLayananId, waktuPemasangan }) => {
  return new Promise(async (resolve, reject) => {
    try {
      let authData = await getAuthInDb(authId);
      authData = authData.data;
      const pelangganId = authData.pelangganId;
      let currentDataMenungguVerifikasi = await getLayananInDb({
        pelangganId,
        status: "menunggu_verifikasi",
      });
      currentDataMenungguVerifikasi = currentDataMenungguVerifikasi.data;
      let currentDataDiverifikasi = await getLayananInDb({
        pelangganId,
        status: "diverifikasi",
      });
      currentDataDiverifikasi = currentDataDiverifikasi.data;
      let currentDataTerpasang = await getLayananInDb({
        pelangganId,
        status: "terpasang",
      });
      currentDataTerpasang = currentDataTerpasang.data;
      let data = {};

      if (
        currentDataMenungguVerifikasi.length > 0 ||
        currentDataDiverifikasi.length > 0 ||
        currentDataTerpasang.length > 0
      ) {
        return reject(
          buildErrObject(
            442,
            "Tidak dapat menambah data layanan. Layanan masih dalam proses"
          )
        );
      }
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
