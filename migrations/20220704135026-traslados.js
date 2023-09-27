'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('traslados', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha: {
        type: Sequelize.STRING,
        allowNull: false
      },
      descripcion:{
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
      id_usuario: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
            model: 'usuarios',
            key: 'id'
        }
      },
      id_tienda_envio: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
            model: 'tiendas',
            key: 'id'
        }
      },
      id_tienda_recibe: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
            model: 'tiendas',
            key: 'id'
        }
      },
      id_responsable_envio: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
            model: 'usuarios',
            key: 'id'
        }
      },
      id_responsable_recibe: {
        type: Sequelize.INTEGER,
        references: {
            model: 'usuarios',
            key: 'id'
        }
      },
      inconsistencias:{
        type: Sequelize.STRING,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('traslados');
  }
};
