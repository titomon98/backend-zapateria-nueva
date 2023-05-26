'use strict';
var Sequelize = require("sequelize");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class zapato extends Model {
    
  };
  zapato.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estilo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    caracteristicas: {
      type: DataTypes.STRING,
      allowNull: false
    },
    precio_costo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    precio_venta: {
      type: DataTypes.STRING,
      allowNull: false
    },
    precio_minimo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    precio_mayorista: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'zapatos',
  });
  return zapato;
};