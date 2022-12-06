"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class actor extends Model {
    static associate(models) {
    }
  }
  actor.init(
    {
      id_actor: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "actor",
    }
  );
  return actor;
};
