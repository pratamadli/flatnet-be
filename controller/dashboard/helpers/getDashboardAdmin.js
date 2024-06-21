const { buildErrResp, buildSuccResp } = require("../../../middleware/utils");
const { User, Layanan, Pelanggan, Petugas } = require("../../../models");

const getDashboardAdmin = (authData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {};
      const totalUser = await User.count();
      const totalPelanggan = await Pelanggan.count();
      const totalLayanan = await Layanan.count();
      const totalPetugas = await Petugas.count();

      data = {
        ...authData,
        totalPetugas,
        totalLayanan,
        totalPelanggan,
        totalUser,
      };

      resolve(buildSuccResp(data, "Success Get Dashboard Admin"));
    } catch (error) {
      return reject(buildErrResp(null, error.message));
    }
  });
};

module.exports = { getDashboardAdmin };
