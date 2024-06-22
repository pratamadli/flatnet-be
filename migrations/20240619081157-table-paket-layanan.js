"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("paketLayanan", {
      paketLayananId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      namaPaket: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hargaPaket: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      deskripsiPaket: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      imagePaket: {
        type: Sequelize.STRING,
        allowNull: true,
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
    await queryInterface.dropTable("paket_layanan");
  },
};
