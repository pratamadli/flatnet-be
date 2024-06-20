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
        as: 'layanan'
      });
    }
  }
  Pelanggan.init({
    pelangganId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    modelName: 'Pelanggan',
    tableName: 'pelanggan'
  });
  return Pelanggan;
};
