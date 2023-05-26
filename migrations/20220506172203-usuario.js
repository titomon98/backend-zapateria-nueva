'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nombre: {
        type: Sequelize.STRING,
      },
      apellidos: {
        type: Sequelize.STRING,
      },
      telefono: {
        type: Sequelize.STRING,
      },
      correo: {
        type: Sequelize.STRING,
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
      id_tipo_usuario: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
            model: 'tipo_usuarios',
            key: 'id'
        }
      },
    });
    await queryInterface.bulkInsert('usuarios', [{
      user: 'Zapateria',
      password: '$2a$10$LcjUIbHBczz1//t7fqC98OFAyK.c2EE4bUcQ4BrulqJ.ItEXk82Lq',
      nombre: 'Zapateria',
      apellidos: 'El Centro',
      telefono: '5000000',
      correo: null,
      estado: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      id_tipo_usuario: 1,
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('usuarios');
  }
};
