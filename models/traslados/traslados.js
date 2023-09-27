'use strict';
var Sequelize = require("sequelize");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class traslado extends Model {
    static associate(models) {
      traslado.belongsTo(models.usuarios, {
        foreignKey: "id_usuario",
      });
      traslado.belongsTo(models.usuarios, {
        foreignKey: "id_responsable_envio",
      });
      traslado.belongsTo(models.usuarios, {
        foreignKey: "id_responsable_recibe",
      });
      traslado.belongsTo(models.tiendas, {
        foreignKey: "id_tienda_envio",
      });
      traslado.belongsTo(models.tiendas, {
        foreignKey: "id_tienda_recibe",
      });
      traslado.hasMany(models.detalle_traslados, {
        foreignKey: "id_traslado",
      });
    }
  };
  traslado.init({
    descripcion:{
      type: DataTypes.STRING,
      allowNull: false
    },
    inconsistencias:{
        type: DataTypes.STRING,
    },
    fecha:{
      type: DataTypes.STRING,
      allowNull: false
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_usuario: {
      type: DataTypes.INTEGER,
    },
    id_tienda_envio: {
        type: DataTypes.INTEGER,
    },
    id_tienda_recibe: {
        type: DataTypes.INTEGER,
    },
    id_responsable_envio: {
        type: DataTypes.INTEGER,
    },
    id_responsable_recibe: {
        type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'traslados',
  });
  return traslado;
};