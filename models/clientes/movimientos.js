'use strict';
var Sequelize = require("sequelize");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class movimientos extends Model {
    static associate(models) {
      movimientos.belongsTo(models.clientes, {
        foreignKey: "id_cliente",
      });
    }
  };
  movimientos.init({
    cantidad: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    tipo_movimiento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_cliente: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
  }, {
    sequelize,
    modelName: 'movimientos',
  });
  return movimientos;
};