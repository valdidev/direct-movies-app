'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class actorMovies extends Model {

    static associate(models) {
    }
  }
  actorMovies.init({
    id_actorMovies: {
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
    movieIdMovie: {
      type: DataTypes.INTEGER,
      references: {
        model: 'movies',
        key: 'id_movies'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }
  }, {
    sequelize,
    modelName: 'actorMovies',
  });
  return actorMovies;
};