'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pelanggan extends Model {
    static associate(models) {
      Pelanggan.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      Pelanggan.hasMany(models.Layanan, {
        foreignKey: 'pelangganId',
        as: 'layanans'
      });
    }
  }
  Pelanggan.init({
    nik: DataTypes.STRING,
    nama: DataTypes.STRING,
    no_telp: DataTypes.STRING,
    alamat: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pelanggan',
    tableName: 'pelanggan'
  });
  return Pelanggan;
};
