'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaketLayanan extends Model {
    static associate(models) {
      PaketLayanan.hasMany(models.Layanan, {
        foreignKey: 'paketId',
        as: 'layanans'
      });
    }
  }
  PaketLayanan.init({
    nama_paket: DataTypes.STRING,
    harga_paket: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PaketLayanan',
    tableName: 'paket_layanan'
  });
  return PaketLayanan;
};
