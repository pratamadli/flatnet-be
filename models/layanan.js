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
        foreignKey: 'paketLayananId',
        as: 'paketLayanan'
      });
      Layanan.belongsTo(models.Petugas, {
        foreignKey: 'petugasId',
        as: 'petugas'
      });
    }
  }
  Layanan.init({
    layananId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    pelangganId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    paketLayananId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    petugasId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM,
      values: ['menunggu verifikasi', 'diverifikasi', 'ditolak', 'terpasang', 'selesai'],
      allowNull: false
    },
    alasanTolak: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fileBukti: {
      type: DataTypes.STRING,
      allowNull: true
    },
    waktuPemasangan: {
      type: DataTypes.DATE,
      allowNull: true
    },
    createdUserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    updatedUserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Layanan',
    tableName: 'layanan'
  });
  return Layanan;
};
