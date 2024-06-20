const { buildErrResp, buildSuccResp } = require("../../../middleware/utils");
const { User, Pelanggan, Petugas } = require("../../../models");
const bcrypt = require("bcryptjs");
const { getAuthInDb } = require("../../auth/helpers");

const createUserInDb = (
  userId,
  { roleId, email, password, nama, noTelp, nik = null, alamat = null }
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
        roleId,
        email,
        password: hashedPassword,
        nama,
        noTelp,
        nik,
        alamat,
        createdUserId: userId,
        updatedUserId: userId,
      });

      const dataValue = user?.dataValues;
      data = { ...dataValue };
      const newUserId = dataValue?.userId;
      if (roleId === 2) {
        const bodyPetugas = {
          userId: newUserId,
          createdUserId: userId,
          updatedUserId: userId,
        };

        await Petugas.create(bodyPetugas);
      } else if (roleId === 3) {
        const bodyPelanggan = {
          userId: newUserId,
          createdUserId: userId,
          updatedUserId: userId,
        };

        await Petugas.create(bodyPelanggan);
      }

      resolve(buildSuccResp(data, "Success Create User"));
    } catch (error) {
      return reject(buildErrResp(null, error.message));
    }
  });
};

module.exports = { createUserInDb };
