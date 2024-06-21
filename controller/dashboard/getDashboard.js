const { buildSuccResp, buildErrResp } = require("../../middleware/utils");
const { getAuthInDb } = require("../auth/helpers");
const {
  getDashboardAdmin,
  getDashboardPelanggan,
  getDashboardPetugas,
} = require("./helpers");

const getDashboard = async (req, res) => {
  try {
    const userId = req.user.userId;
    let authData = await getAuthInDb(userId);
    authData = authData?.data || {};
    const authRoleId = authData.roleId;
    let data = {};

    if (authRoleId === 1) {
      data = await getDashboardAdmin(authData);
    } else if (authRoleId === 2) {
      data = await getDashboardPetugas(authData);
    } else if (authRoleId === 3) {
      data = await getDashboardPelanggan(authData);
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(buildErrResp(null, error.message));
  }
};

module.exports = { getDashboard };
