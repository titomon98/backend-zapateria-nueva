'use strict';
var Sequelize = require("sequelize");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detalle_traslado extends Model {
    static associate(models) {
      detalle_traslado.belongsTo(models.traslados, {
        foreignKey: "id_traslado",
      });

      detalle_traslado.belongsTo(models.tallas, {
        foreignKey: "id_talla",
      });
    }
  };
  detalle_traslado.init({
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
    pertenencia: {
      type: DataTypes.STRING,
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_traslado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_talla: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'detalle_traslados',
  });
  return detalle_traslado;
};