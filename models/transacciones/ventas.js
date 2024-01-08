'use strict';
var Sequelize = require("sequelize");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class venta extends Model {
    static associate(models) {
      venta.belongsTo(models.clientes, {
        foreignKey: "id_cliente",
      });
      venta.belongsTo(models.usuarios, {
        foreignKey: "id_usuario",
      });
      venta.hasMany(models.detalle_ventas, {
        foreignKey: "id_venta",
      });
    }
  };
  venta.init({
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    total: {
      type: DataTypes.STRING,
      allowNull: false
    },
    referencia_factura: {
      type: DataTypes.STRING,
    },
    numero: {
      type: DataTypes.STRING,
    },
    tipo_cobro: {
      type: DataTypes.STRING,
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    estado_cobro:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'ventas',
  });
  return venta;
};