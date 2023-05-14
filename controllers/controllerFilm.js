const { Actor, Category, Film } = require("../models");

class Controller {
  static async getAllFilm(req, res, next) {
    try {
      const { page, size } = req.query;
      const dataFilm = await Film.findAndCountAll({
        limit: size,
        offset: page * size,
        include: [
          { model: Actor, attributes: ["first_name", "last_name"] },
          { model: Category, attributes: ["name"] },
        ],
        attributes: {
          exclude: ["id", "ActorId", "CategoryId", "createdAt", "updatedAt"],
        },
      });
      res.status(200).json({ data: dataFilm });
    } catch (err) {
      next(err);
    }
  }

  static async filmById(req, res, next) {
    try {
      const { id } = req.params;
      const filmId = await Film.findByPk(+id, {
        include: [
          { model: Actor, attributes: ["first_name", "last_name"] },
          { model: Category, attributes: ["name"] },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      if (filmId === null) {
        throw { name: "NotFound" };
      }
      res.status(200).json({ data: filmId });
    } catch (err) {
      next(err);
    }
  }

  static async addNewFilm(req, res, next) {
    try {
      const { title, description, release_year, rating, ActorId, CategoryId } = req.body;
      const newFilm = await Film.create({
        title,
        description,
        release_year: +release_year,
        rating: +rating,
        ActorId: +ActorId,
        CategoryId: +CategoryId,
      });
      res.status(201).json({ statusCode: 201, message: "Film created successfully", data: newFilm });
    } catch (err) {
      next(err);
    }
  }

  static async deleteFilmById(req, res, next) {
    try {
      const { id } = req.params;
      const deleteFilm = Film.destroy({ where: { id } });

      if (deleteFilm <= 0) {
        throw { name: "NotFound" };
      }
      res.status(200).json({
        statusCode: 200,
        message: `Movie with id ${id} success to deleted`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateFilm(req, res, next) {
    try {
      const { id } = req.params;
      const { title, description, release_year, rating, ActorId, CategoryId } = req.body;
      const updatedFilm = await Film.update(
        {
          title,
          description,
          release_year: +release_year,
          rating: +rating,
          ActorId: +ActorId,
          CategoryId: +CategoryId,
        },
        { where: { id } }
      );
      res.status(200).json({
        statusCode: 200,
        data: updatedFilm,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
