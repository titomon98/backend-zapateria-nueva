'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('detalle_cobros', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      efectivo: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: true
      },
      tarjeta: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: true
      },
      deposito: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: true
      },
      cheque: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: true
      },
      total: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: true
      },
      fecha: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      id_venta: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
            model: 'ventas',
            key: 'id'
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('detalle_ventas');
  }
};
