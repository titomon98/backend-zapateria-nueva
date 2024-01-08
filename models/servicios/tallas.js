'use strict';
var Sequelize = require("sequelize");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class talla extends Model {
    static associate(models) {
      talla.belongsTo(models.zapatos, {
        foreignKey: "id_zapato",
      });
      talla.belongsTo(models.tiendas, {
        foreignKey: "id_tienda",
      })
      talla.hasMany(models.inventarios, {
        foreignKey: "id_tienda",
      })
    }
  };
  talla.init({
    talla: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cantidad: {
        type: DataTypes.STRING,
        allowNull: false
      },
      codigo: {
        type: DataTypes.STRING
      },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_zapato: {
      type: DataTypes.INTEGER
    },
    id_tienda: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'tallas',
  });
  return talla;
};