'use strict';
var Sequelize = require("sequelize");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cliente extends Model {
    static associate(models) {
      cliente.belongsTo(models.tipo_clientes, {
        foreignKey: "id_tipo_cliente",
      });
      cliente.hasMany(models.movimientos, {
        foreignKey: "id_cliente",
      });
      cliente.hasMany(models.ventas, {
        foreignKey: "id_cliente",
      });
    }
  };
  cliente.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false
    },
    correo: {
      type: DataTypes.STRING,
    },
    nit: {
        type: DataTypes.STRING,
    },
    direccion: {
        type: DataTypes.STRING,
    }, 
    puntos_totales: {
        type: DataTypes.DECIMAL(10,2),
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_tipo_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'clientes',
  });
  return cliente;
};