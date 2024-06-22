"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Petugas extends Model {
    static associate(models) {
      Petugas.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      Petugas.hasMany(models.Layanan, {
        foreignKey: "petugasId",
        as: "layanan",
      });
    }
  }
  Petugas.init(
    {
      petugasId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updatedUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Petugas",
      tableName: "petugas",
    }
  );
  return Petugas;
};
