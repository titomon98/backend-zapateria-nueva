'use strict';
var Sequelize = require("sequelize");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tipo_cliente extends Model {
    static associate(models) {
      tipo_cliente.hasMany(models.clientes, {
        foreignKey: "id_tipo_cliente",
      });
    }
  };
  tipo_cliente.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tasa: {
        type: DataTypes.STRING,
    }, 
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'tipo_clientes',
  });
  return tipo_cliente;
};