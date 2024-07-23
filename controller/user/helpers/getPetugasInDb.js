const { buildErrResp, buildSuccResp } = require("../../../middleware/utils");
const { Petugas } = require("../../../models");
const { getUsersInDb } = require("./getUsersInDb");

const getPetugasInDb = (userId, petugasId = null) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = [];
      let petugas = await Petugas.findAll();
      for (let i = 0; i < petugas.length; i++) {
        let newObj = {};
        const dataPetugas = petugas[i].dataValues;
        const user = await getUsersInDb(userId, dataPetugas.userId);
        const dataUser = user.data;
        newObj = {
          ...dataUser,
          petugasId: dataPetugas.petugasId,
        };
        data.push(newObj);
      }

      if (petugasId !== null) {
        data = data.filter((x) => x.petugasId == petugasId);

        data = data[0] || {};
      }

      resolve(buildSuccResp(data, "Success Get Petugas"));
    } catch (error) {
      return reject(buildErrResp(null, error.message));
    }
  });
};

module.exports = { getPetugasInDb };
