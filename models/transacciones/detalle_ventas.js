'use strict';
var Sequelize = require("sequelize");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detalle_venta extends Model {
    static associate(models) {
      detalle_venta.belongsTo(models.tallas, {
        foreignKey: "id_talla",
      });
      detalle_venta.belongsTo(models.ventas, {
        foreignKey: "id_venta",
      });
    }
  };
  detalle_venta.init({
    cantidad: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subtotal: {
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
    id_venta: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'detalle_ventas',
  });
  return detalle_venta;
};