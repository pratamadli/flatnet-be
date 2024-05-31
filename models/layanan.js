'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Layanan extends Model {
    static associate(models) {
      Layanan.belongsTo(models.Pelanggan, {
        foreignKey: 'pelangganId',
        as: 'pelanggan'
      });
      Layanan.belongsTo(models.PaketLayanan, {
        foreignKey: 'paketId',
        as: 'paketLayanan'
      });
      Layanan.belongsTo(models.Jadwal, {
        foreignKey: 'jadwalId',
        as: 'jadwal'
      });
      Layanan.belongsTo(models.Petugas, {
        foreignKey: 'petugasId',
        as: 'petugas'
      });
    }
  }
  Layanan.init({
    pelangganId: DataTypes.INTEGER,
    paketId: DataTypes.INTEGER,
    jadwalId: DataTypes.INTEGER,
    petugasId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    alasan_tolak: DataTypes.STRING,
    file_bukti: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Layanan',
    tableName: 'layanan'
  });
  return Layanan;
};
