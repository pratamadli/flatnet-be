'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Jadwal extends Model {
    static associate(models) {
      Jadwal.hasMany(models.Layanan, {
        foreignKey: 'jadwalId',
        as: 'layanans'
      });
    }
  }

  Jadwal.init({
    waktu: {
      type: DataTypes.DATE,
      allowNull: false, // Ensures this field is not null
      defaultValue: DataTypes.NOW // Sets a default value to current date and time
    },
    status_jadwal: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Jadwal',
    tableName: 'jadwals', // Fixed the table name to match plural convention
    timestamps: true // Ensures that createdAt and updatedAt fields are managed by Sequelize
  });

  return Jadwal;
};
