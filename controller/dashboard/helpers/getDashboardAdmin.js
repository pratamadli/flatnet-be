const { buildErrResp, buildSuccResp } = require("../../../middleware/utils");
const { User, Layanan, Pelanggan, Petugas } = require("../../../models");
const moment = require("moment");

const getMonthlyCounts = (layanan) => {
  // Get the current year
  const currentYear = moment().year();
  // Initialize a structure to hold the counts for three years
  const monthlyCounts = Array.from({ length: 12 }, (_, index) => [
    moment().month(index).format("MMMM"),
    0, // currentYear - 2 count
    0, // currentYear - 1 count
    0, // currentYear count
  ]);

  // Iterate over the layanan data
  layanan.forEach((item) => {
    const year = moment(item.dataValues.createdAt).year();
    const month = moment(item.dataValues.createdAt).month();

    // Ensure the year is within the last three years
    if (year >= currentYear - 2 && year <= currentYear) {
      // Calculate the year index for the counts array
      const yearIndex = year - (currentYear - 2) + 1;
      if (yearIndex >= 1 && yearIndex <= 3) {
        monthlyCounts[month][yearIndex] += 1;
      }
    }
  });

  const last2Years = currentYear - 2;
  const lastYear = currentYear - 1;

  // Add the year headers
  const result = [
    [
      "Bulan",
      last2Years.toString(),
      lastYear.toString(),
      currentYear.toString(),
    ],
  ];
  result.push(...monthlyCounts);

  return result;
};

const getStatusCountsCurrentYear = (layanan) => {
  // Define the current year
  const currentYear = new Date().getFullYear();

  // Define a mapping of statuses to labels
  const statusLabels = {
    menunggu_verifikasi: "Menunggu Verifikasi",
    ditolak: "Ditolak",
    diverifikasi: "Diverifikasi",
    terpasang: "Terpasang",
    selesai: "Selesai",
  };

  // Initialize a dictionary to count the occurrences of each status
  const statusCounts = {
    menunggu_verifikasi: 0,
    ditolak: 0,
    diverifikasi: 0,
    terpasang: 0,
    selesai: 0,
  };

  // Iterate over the layanan data and count the statuses for the current year
  layanan.forEach((item) => {
    const { createdAt, status } = item.dataValues;
    const year = new Date(createdAt).getFullYear();
    if (year === currentYear && statusCounts[status] !== undefined) {
      statusCounts[status] += 1;
    }
  });

  // Build the result array with headers and counts
  const result = [["Status", "Jumlah"]];
  Object.keys(statusCounts).forEach((status) => {
    result.push([statusLabels[status], statusCounts[status]]);
  });

  return result;
};

const getDashboardAdmin = (authData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {};
      const totalUser = await User.count();
      const totalPelanggan = await Pelanggan.count();
      const totalLayanan = await Layanan.count();
      const totalPetugas = await Petugas.count();

      const layanan = await Layanan.findAll();
      const monthlyData = getMonthlyCounts(layanan);
      const yearDataByStatus = getStatusCountsCurrentYear(layanan);
      data = {
        ...authData,
        totalPetugas,
        totalLayanan,
        totalPelanggan,
        totalUser,
        monthlyData,
        yearDataByStatus,
      };

      resolve(buildSuccResp(data, "Success Get Dashboard Admin"));
    } catch (error) {
      return reject(buildErrResp(null, error.message));
    }
  });
};

module.exports = { getDashboardAdmin };
