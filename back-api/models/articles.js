'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class articles extends Model {
    static associate(models) {
      articles.hasOne(models.series)
      articles.hasOne(models.movies)
      articles.hasMany(models.loan)

    }
  }
  articles.init({
    id_articles: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    is_movie: DataTypes.BOOLEAN


  },
    {
      sequelize,
      modelName: 'articles',
    });
  return articles;
};