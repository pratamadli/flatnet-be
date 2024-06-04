const { buildErrResp, buildSuccResp } = require("../../../middleware/utils");
const { User, Pelanggan, Petugas } = require("../../../models");

const getAuthInDb = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findByPk(userId, {
        attributes: { exclude: ["password"] },
      });

      if (!user) {
        return reject(buildErrResp(null, "User not found"));
      }

      const roleId = user?.dataValues?.roleId;

      let data = { ...user?.dataValues };

      if (roleId === 3) {
        let pelanggan = await Pelanggan.findOne({ where: { userId } });

        if (pelanggan) {
          pelanggan = pelanggan?.dataValues;
          data = {
            ...data,
            nik: pelanggan?.nik,
            nama: pelanggan?.nama,
            no_telp: pelanggan?.no_telp,
            alamat: pelanggan?.alamat,
            pelanggan_id: pelanggan?.id,
          };
        } else {
          return reject(buildErrResp(null, "Pelanggan not found"));
        }
      } else if (roleId === 2) {
        let petugas = await Petugas.findOne({ where: { userId } });

        if (petugas) {
          petugas = petugas?.dataValues;
          data = {
            ...data,
            nama: petugas?.nama,
            no_telp: petugas?.no_telp,
            petugas_id: petugas?.id,
          };
        } else {
          return reject(buildErrResp(null, "Petugas not found"));
        }
      }

      resolve(buildSuccResp(data, "Success Get Auth Data"));
    } catch (error) {
      return reject(buildErrResp(null, error.message));
    }
  });
};

module.exports = {
  getAuthInDb,
};
