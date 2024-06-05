const { buildErrResp, buildSuccResp } = require("../../../middleware/utils");
const { Petugas } = require("../../../models");

const { getAuthInDb } = require("../../auth/helpers");

const getPetugasInDb = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log({ id });
      const petugas = await Petugas.findOne({ where: { userId: id } });
      let data = {};
      if (petugas) {
        data = petugas.dataValues || {};
      }

      resolve(buildSuccResp(data, "Success Get Petugas"));
    } catch (error) {
      return reject(buildErrResp(null, error.message));
    }
  });
};

module.exports = { getPetugasInDb };
