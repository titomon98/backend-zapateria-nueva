'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('clientes', {
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
      telefono: {
        type: Sequelize.STRING,
        allowNull: false
      },
      correo: {
        type: Sequelize.STRING,
      },
      nit: {
          type: Sequelize.STRING,
      },
      direccion: {
          type: Sequelize.STRING,
      }, 
      puntos_totales: {
          type: Sequelize.DECIMAL(10,2),
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
      id_tipo_cliente: {
        type: Sequelize.INTEGER,
        references: {
            model: 'tipo_clientes',
            key: 'id'
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tipo_clientes');
  }
};
