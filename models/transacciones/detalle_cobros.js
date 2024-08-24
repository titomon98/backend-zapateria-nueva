'use strict';
var Sequelize = require("sequelize");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detalle_cobro extends Model {
    static associate(models) {
        detalle_cobro.belongsTo(models.ventas, {
            foreignKey: "id_venta",
        });
    }
  };
  detalle_cobro.init({
    efectivo: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    tarjeta: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    deposito: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    cheque: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    total: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    id_venta: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    }
  }, {
    sequelize,
    modelName: 'detalle_cobros',
  });
  return detalle_cobro;
};