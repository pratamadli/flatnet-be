"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PaketLayanan extends Model {
    static associate(models) {
      PaketLayanan.hasMany(models.Layanan, {
        foreignKey: "paketLayananId",
        as: "layanan",
      });
    }
  }
  PaketLayanan.init(
    {
      paketLayananId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      namaPaket: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hargaPaket: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      deskripsiPaket: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      imagePaket: {
        type: DataTypes.STRING,
        allowNull: true,
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
      modelName: "PaketLayanan",
      tableName: "paketLayanan",
    }
  );
  return PaketLayanan;
};
