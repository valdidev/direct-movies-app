'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class actorSeries extends Model {
    static associate(models) {
    }
  }
  actorSeries.init({
    id_actorSeries: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    actorIdActor: {
      type: DataTypes.INTEGER,
      references: {
        model: 'actors',
        key: 'id_actor'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    },
    seriesIdSeries: {
      type: DataTypes.INTEGER,
      references: {
        model: 'series',
        key: 'id_series'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }
  }, {
    sequelize,
    modelName: 'actorSeries',
  });
  return actorSeries;
};