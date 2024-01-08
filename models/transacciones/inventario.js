'use strict';
var Sequelize = require("sequelize");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class inventario extends Model {
    static associate(models) {
      inventario.belongsTo(models.tallas, {
        foreignKey: "id_talla",
      });
    }
  };
  inventario.init({
    cantidad: {
      type: DataTypes.STRING,
      allowNull: false
    },
    existencia_previa: {
      type: DataTypes.STRING,
      allowNull: false
    },
    precio_costo: {
      type: DataTypes.STRING,
    },
    precio_venta: {
      type: DataTypes.STRING,
    },
    movimiento: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_talla: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'inventarios',
  });
  return inventario;
};