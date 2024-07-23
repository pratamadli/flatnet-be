const { buildErrResp, buildSuccResp } = require("../../../middleware/utils");
const moment = require("moment");
const parseString = (input) => {
  return input
    .split("_") // Split the string into an array of words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" ");
};

const {
  Layanan,
  Pelanggan,
  Petugas,
  PaketLayanan,
  User,
} = require("../../../models");
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

      const responseData = [];

      for (let i = 0; i < data.length; i++) {
        let newObj = {};
        let namaPelanggan = "";
        let namaPetugas = "";
        let namaPaket = "";
        let hargaPaket = 0;
        let deskripsiPaket = "";
        let namaStatus = "";
        let alamatPelanggan = "";

        const pelangganId = data[i].pelangganId;
        const petugasId = data[i].petugasId;
        const paketLayananId = data[i].paketLayananId;
        const status = data[i].status;
        const waktuPemasangan = moment(data[i].waktuPemasangan)
          .format("DD-MM-YYYY HH:mm")
          .toString();

        if (pelangganId) {
          const pelanggan = await Pelanggan.findOne({
            where: { pelangganId: pelangganId },
          });
          const user = await User.findOne({
            where: { userId: pelanggan.dataValues.userId },
          });
          namaPelanggan = user.dataValues.nama;
          alamatPelanggan = user.dataValues.alamat;
        }

        if (petugasId) {
          const petugas = await Petugas.findOne({
            where: { petugasId: petugasId },
          });
          const user = await User.findOne({
            where: { userId: petugas.dataValues.userId },
          });
          namaPetugas = user.dataValues.nama;
        }

        if (paketLayananId) {
          const paketLayanan = await PaketLayanan.findOne({
            where: { paketLayananId: paketLayananId },
          });
          namaPaket = paketLayanan.dataValues.namaPaket;
          hargaPaket = paketLayanan.dataValues.hargaPaket;
          deskripsiPaket = paketLayanan.dataValues.deskripsiPaket;
        }
        if (status) {
          namaStatus = await parseString(status);
        }

        newObj = {
          ...data[i].dataValues,
          namaPelanggan,
          alamatPelanggan,
          namaPetugas,
          namaPaket,
          hargaPaket,
          deskripsiPaket,
          namaStatus,
          waktuPemasangan,
        };

        responseData.push(newObj);
      }

      resolve(buildSuccResp(responseData, "Success Get Layanan"));
    } catch (error) {
      return reject(buildErrResp(null, error.message));
    }
  });
};

module.exports = { getLayananInDb };
