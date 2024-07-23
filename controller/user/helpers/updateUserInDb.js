const { buildErrResp, buildSuccResp } = require("../../../middleware/utils");
const { User, Pelanggan, Petugas } = require("../../../models");
const bcrypt = require("bcryptjs");
const { getAuthInDb } = require("../../auth/helpers");

const updateUserInDb = (
  authId,
  { userId, roleId, email, password, nama, noTelp, nik = null, alamat = null }
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let authData = await getAuthInDb(authId);
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
      const user = await User.findByPk(userId);
      if (!user) {
        return reject(buildErrResp(null, "User not found"));
      }
      let data = {};
      const hashedPassword = await bcrypt.hash(password, 10);
      const updateUser = await user.update({
        roleId,
        email,
        password: hashedPassword,
        nama,
        noTelp,
        nik,
        alamat,
        updatedUserId: authId,
      });

      console.log("UPDATE USER", updateUser);

      const dataValue = updateUser?.dataValues;
      data = { ...dataValue };
      const updateUserId = dataValue?.id;
      const updatedRoleId = dataValue?.roleId;
      console.log({ updateUserId, updatedRoleId });
      if (updatedRoleId === 2) {
        const petugas = await Petugas.findOne(updateUserId);
        if (!petugas) {
          const bodyPetugas = {
            userId: updateUserId,
            updatedUserId: authId,
          };

          await Petugas.create(bodyPetugas);
        } else {
          const bodyPetugas = {
            updatedUserId: authId,
          };

          await petugas.update(bodyPetugas);
        }
      } else if (updatedRoleId === 3) {
        const pelanggan = await Pelanggan.findOne(updateUserId);
        if (!pelanggan) {
          const bodyPelanggan = {
            userId: updateUserId,
            updatedUserId: authId,
          };

          await Pelanggan.create(bodyPelanggan);
        } else {
          const bodyPelanggan = {
            updatedUserId: authId,
          };

          await pelanggan.update(bodyPelanggan);
        }
      }

      resolve(buildSuccResp(data, "Success Update User"));
    } catch (error) {
      return reject(buildErrResp(null, error.message));
    }
  });
};

module.exports = { updateUserInDb };
