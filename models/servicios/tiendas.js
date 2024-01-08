'use strict';
var Sequelize = require("sequelize");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tienda extends Model {
    static associate(models) {
      tienda.hasMany(models.usuarios, {
        foreignKey: "id_tienda",
      });
    }
  };
  tienda.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false
      },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'tiendas',
  });
  return tienda;
};