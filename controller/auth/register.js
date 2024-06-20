const { buildSuccResp, buildErrResp } = require("../../middleware/utils");
const { User, Pelanggan } = require("../../models");
const bcrypt = require("bcryptjs");

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const register = async (req, res) => {
  const { email, password, nik, nama, noTelp, alamat } = req.body;
  const roleId = 3; // Role ID for 'pelanggan'

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      roleId,
      nik,
      nama,
      noTelp,
      alamat,
    });
    const dataValue = user?.dataValues;
    try {
      const userId = dataValue?.userId;

      const bodyPelanggan = {
        userId,
        createdUserId: userId,
        updatedUserId: userId,
      };

      const pelanggan = await Pelanggan.create(bodyPelanggan);
      res.status(200).json(buildSuccResp(pelanggan, "SUCCESS"));
    } catch (error) {
      console.log("ERROR PELANGGAN", error);
      res.status(400).json(buildErrResp(null, error.message));
    }
  } catch (error) {
    console.log("ERROR USER", error);
    res.status(400).json(buildErrResp(null, error.message));
  }
};

module.exports = { register };
