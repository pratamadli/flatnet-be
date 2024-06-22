"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("layanan", {
      layananId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      pelangganId: {
        type: Sequelize.INTEGER,
        references: {
          model: "pelanggan",
          key: "pelangganId",
        },
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      paketLayananId: {
        type: Sequelize.INTEGER,
        references: {
          model: "paketLayanan",
          key: "paketLayananId",
        },
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      petugasId: {
        type: Sequelize.INTEGER,
        references: {
          model: "petugas",
          key: "petugasId",
        },
        allowNull: true,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      status: {
        type: Sequelize.ENUM,
        values: [
          "menunggu_verifikasi",
          "diverifikasi",
          "ditolak",
          "terpasang",
          "selesai",
        ],
        allowNull: false,
      },
      alasanTolak: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      fileBukti: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      waktuPemasangan: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdUserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      updatedUserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("layanan");
  },
};
