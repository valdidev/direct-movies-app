'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class movies extends Model {
    static associate(models) {

      movies.belongsTo(models.articles);

    }
  }
  movies.init({
    id_movies: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 20]
      }
    },
    genre: DataTypes.STRING,
    summary: DataTypes.TEXT,
    date: DataTypes.DATE,
    poster: {
      type: DataTypes.STRING,
      allowNull: true,
      len: [1, 255]
    },
    duration: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 30]
      },
    },
    rank: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'movies',
  });
  return movies;
};