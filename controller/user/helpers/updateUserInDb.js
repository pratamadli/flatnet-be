const { buildErrResp, buildSuccResp } = require("../../../middleware/utils");
const { User, Pelanggan, Petugas } = require("../../../models");
const bcrypt = require("bcryptjs");
const { getAuthInDb } = require("../../auth/helpers");
const { getPetugasInDb } = require("./getPetugasInDb");
const { getPelangganInDb } = require("./getPelangganInDb");

const updateUserInDb = (
  userId,
  { id, roleId, email, password, nama, no_telp, nik = null, alamat = null }
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
      const user = await User.findByPk(id);
      if (!user) {
        return reject(buildErrResp(null, "User not found"));
      }
      let data = {};
      const hashedPassword = await bcrypt.hash(password, 10);
      const updateUser = await user.update({
        email,
        password: hashedPassword,
        roleId,
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
            nama,
            no_telp,
            userId: updateUserId,
          };

          const createPetugas = await Petugas.create(bodyPetugas);
          const petugasDataValue = createPetugas?.dataValues;
          data = { ...data, ...petugasDataValue };
        } else {
          const bodyPetugas = {
            nama,
            no_telp,
          };

          const updatePetugas = await petugas.update(bodyPetugas);
          const petugasDataValue = updatePetugas?.dataValues;
          data = { ...data, ...petugasDataValue };
        }
      } else if (updatedRoleId === 3) {
        const pelanggan = await Pelanggan.findOne(updateUserId);
        if (!pelanggan) {
          const bodyPelanggan = {
            nama,
            no_telp,
            userId: updateUserId,
          };

          const createPelanggan = await Pelanggan.create(bodyPelanggan);
          const pelangganDataValue = createPelanggan?.dataValues;
          data = { ...data, ...pelangganDataValue };
        } else {
          const bodyPelanggan = {
            nama,
            no_telp,
            nik,
            alamat,
          };

          const updatePelanggan = await pelanggan.update(bodyPelanggan);
          const pelangganDataValue = updatePelanggan?.dataValues;
          data = { ...data, ...pelangganDataValue };
        }
      }

      resolve(buildSuccResp(data, "Success Update User"));
    } catch (error) {
      return reject(buildErrResp(null, error.message));
    }
  });
};

module.exports = { updateUserInDb };
