'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ventas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha: {
        type: Sequelize.DATE,
        allowNull: false
      },
      total: {
        type: Sequelize.STRING,
        allowNull: false
      },
      referencia_factura: {
        type: Sequelize.STRING,
      },
      numero: {
        type: Sequelize.STRING,
      },
      tipo_cobro: {
        type: Sequelize.STRING,
      },
      estado: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      estado_cobro:{
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
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
            model: 'clientes',
            key: 'id'
        }
      },
      id_usuario: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
            model: 'usuarios',
            key: 'id'
        }
      },
      direccion: {
        type: Sequelize.STRING,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ventas');
  }
};
