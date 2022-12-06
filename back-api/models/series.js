'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class series extends Model {
    static associate(models) {
      series.belongsTo(models.articles);
    }
  }
  series.init({
    id_series: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    summary: DataTypes.TEXT,
    date: DataTypes.DATE,

    poster: {
      type: DataTypes.STRING,
      allowNull: true,
      len: [1, 255]
    },
    episodes: DataTypes.INTEGER,
    genre: DataTypes.STRING,
    rank: DataTypes.FLOAT,
    seasons: DataTypes.INTEGER,
    next_7_days: DataTypes.BOOLEAN,
    is_on_cinema: DataTypes.BOOLEAN,


  }, {
    sequelize,
    modelName: 'series',
  });
  return series;
};