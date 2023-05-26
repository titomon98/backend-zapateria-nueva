'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('zapatos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      estilo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      caracteristicas: {
        type: Sequelize.STRING,
        allowNull: false
      },
      precio_costo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      precio_venta: {
        type: Sequelize.STRING,
        allowNull: false
      },
      precio_minimo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      precio_mayorista: {
        type: Sequelize.STRING,
        allowNull: false
      },
      estado: {
        type: Sequelize.INTEGER,
        allowNull: false
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('zapatos');
  }
};
