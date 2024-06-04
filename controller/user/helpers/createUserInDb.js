const { buildErrResp, buildSuccResp } = require("../../../middleware/utils");
const { User, Pelanggan, Petugas } = require("../../../models");
const bcrypt = require("bcryptjs");
const { getAuthInDb } = require("../../auth/helpers");

const createUserInDb = (
  userId,
  { roleId, email, password, nama, no_telp, nik = null, alamat = null }
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let authData = await getAuthInDb(userId);
      authData = authData.data;

      const authRoleId = authData.roleId;

      if (authRoleId !== 1) {
        return reject(
          buildErrResp(
            null,
            "User don't have any authorization to access this feature"
          )
        );
      }

      let data = {};
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        password: hashedPassword,
        roleId,
      });

      const dataValue = user?.dataValues;
      data = { ...dataValue };
      const newUserId = dataValue?.id;
      if (roleId === 2) {
        const bodyPetugas = {
            nama,
            no_telp,
            userId: newUserId,
          };
  
          const petugas = await Petugas.create(bodyPetugas);
          const petugasDataValue = petugas?.dataValues;
          data = { ...data, ...petugasDataValue };
      } else if (roleId === 3) {
        const bodyPelanggan = {
          nik,
          nama,
          no_telp,
          alamat,
          userId: newUserId,
        };

        const pelanggan = await Pelanggan.create(bodyPelanggan);
        const pelangganDataValue = pelanggan?.dataValues;
        data = { ...data, ...pelangganDataValue };
      }

      resolve(buildSuccResp(data, "Success Create User"));
    } catch (error) {
      return reject(buildErrResp(null, error.message));
    }
  });
};

module.exports = { createUserInDb };
