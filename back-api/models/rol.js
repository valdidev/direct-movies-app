'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rol extends Model {
    static associate(models) {
      rol.hasMany(models.user)
    }
  }
  rol.init({
    id_rol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    membership: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 20]
      }
    }
  }, {
    sequelize,
    modelName: 'rol',
  });
  return rol;
};