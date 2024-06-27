'use strict';
var Sequelize = require("sequelize");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class foto extends Model {
    static associate(models) {
      foto.belongsTo(models.zapatos, {
        foreignKey: "id_zapato",
      });
    }
  };
  foto.init({
    foto: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'fotos',
  });
  return foto;
};