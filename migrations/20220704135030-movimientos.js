'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('movimientos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cantidad: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      tipo_movimiento: {
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
      },
      id_cliente: {
        type: Sequelize.INTEGER,
        references: {
            model: 'clientes',
            key: 'id'
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('movimientos');
  }
};
