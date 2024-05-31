'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Petugas extends Model {
    static associate(models) {
      Petugas.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      Petugas.hasMany(models.Layanan, {
        foreignKey: 'petugasId',
        as: 'layanans'
      });
    }
  }
  Petugas.init({
    nama: DataTypes.STRING,
    no_telp: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Petugas',
    tableName: 'petugas'
  });
  return Petugas;
};
