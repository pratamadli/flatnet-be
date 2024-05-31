'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('layanans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pelangganId: {
        type: Sequelize.INTEGER
      },
      paketId: {
        type: Sequelize.INTEGER
      },
      jadwalId: {
        type: Sequelize.INTEGER
      },
      petugasId: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      alasan_tolak: {
        type: Sequelize.STRING
      },
      file_bukti: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('layanans');
  }
};