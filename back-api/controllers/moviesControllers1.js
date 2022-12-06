const { Op } = require("sequelize");
const { sequelize } = require("../models/index");
const models = require("../models/index");
const MoviesControllers = {};

// get movie by id

MoviesControllers.getMoviesID = async (req, res) => {
  try {
    let { id } = req.params;
    let resp = await models.movies.findAll({
      where: {
        id_movies: id,
      },
    });
    res.send(resp);
  } catch (error) {
    res.send(error);
  }
};

// get top rated movies

MoviesControllers.getMoviesTopRated = async (req, res) => {
  try {

    let resp = await models.movies.findAll({
      where: {
        rank: {
          [Op.gt]: 7.5,
        },
      },
    });
    res.send(resp);
  } catch (error) {
    res.send(error);
  }
};

// get all movies

MoviesControllers.getMovies = async (req, res) => {
  try {
    let { page } = req.params
    let resp = await models.movies.findAll(

      {
        offset: (page - 1) * 5, limit: 5,
      }

    );
    res.send(resp);
  } catch (error) {
    res.send(error);
  }
};

// get movie by title

MoviesControllers.getMoviestitle = async (req, res) => {
  try {
    let { title } = req.params;
    let resp = await models.movies.findAll({
      where: {
        title: {
          [Op.like]: `%${title}%`,
        },
      },
    });
    res.send(resp);
  } catch (error) {
    res.send(error);
  }
};

// get movies by genre

MoviesControllers.getMoviesGenre = async (req, res) => {
  try {
    let { genre } = req.params;
    let resp = await models.movies.findAll({
      where: {
        genre: genre,
      },
    });
    res.send(resp);
  } catch (error) {
    res.send(error);
  }
};

// get movies by actor

MoviesControllers.getMoviesActor = async (req, res) => {
  try {
    let { actor } = req.params;
    let resp = await sequelize.query(
      `SELECT actors.name, movies.title, movies.genre, movies.summary, movies.poster, movies.duration, movies.rank, movies.articleIdArticles
          FROM actors 
          JOIN actorMovies ON actorMovies.actorIdActor = actors.id_actor
          JOIN movies ON actorMovies.movieIdMovie = movies.id_movies
          Where actors.name = "${actor}" `,
      { type: sequelize.QueryTypes.SELECT }
    );
    res.send(resp);
  } catch (error) {
    res.send(error);
  }
};

module.exports = MoviesControllers;
