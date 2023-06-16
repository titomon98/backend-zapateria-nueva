'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tallas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      talla: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cantidad: {
          type: Sequelize.STRING,
          allowNull: false
        },
        codigo: {
          type: Sequelize.STRING
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
      },
      id_zapato: {
        type: Sequelize.INTEGER,
        references: {
            model: 'zapatos',
            key: 'id'
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tallas');
  }
};
