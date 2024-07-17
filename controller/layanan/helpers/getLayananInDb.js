const { buildErrResp, buildSuccResp } = require("../../../middleware/utils");
const { Layanan } = require("../../../models");
const getLayananInDb = ({
  layananId = null,
  petugasId = null,
  pelangganId = null,
  paketLayananId = null,
  status = null,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = [];

      data = await Layanan.findAll();

      console.log("data layanan", data);

      if (layananId !== null) {
        data = data.filter((x) => x.layananId == layananId);
      }

      if (pelangganId !== null) {
        data = data.filter((x) => x.pelangganId == pelangganId);
      }

      if (petugasId !== null) {
        data = data.filter((x) => x.petugasId == petugasId);
      }

      if (paketLayananId !== null) {
        data = data.filter((x) => x.paketLayananId == paketLayananId);
      }

      if (status !== null) {
        data = data.filter((x) => x.status == status);
      }

      resolve(buildSuccResp(data, "Success Get Layanan"));
    } catch (error) {
      return reject(buildErrResp(null, error.message));
    }
  });
};

module.exports = { getLayananInDb };
