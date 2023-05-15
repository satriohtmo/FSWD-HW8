/**
 * @swagger
 * components:
 *   schemas:
 *     Films:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - release_year
 *         - rating
 *         - ActorId
 *         - CategoryId
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the film
 *         description:
 *           type: text
 *           description: The film explanation
 *         release_year:
 *           type: integer
 *           description: The release of the film
 *         rating:
 *           type: integer
 *           description: Rating of the film
 *         ActorId:
 *           type: integer
 *           description: Asosiate with the actor
 *         CategoryId:
 *           type: integer
 *           description: Asosiate with the category
 *
 */
/**

/**
 * @swagger
 * tags:
 *    name: Films
 *    description: The films managing API
 * /films?page={page}&size={size}:
 *    get:
 *      summary: Get all films by pagination
 *      tags: [Films]
 *      parameters:
 *         - in: query
 *           name: page
 *           schema:
 *             type: integer
 *           description: The number of items to skip before starting to collect the result set
 *         - in: query
 *           name: size
 *           schema:
 *             type: integer
 *           description: The numbers of items to return
 *      responses:
 *        200:
 *          description: The created movie.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Films'
 *        500:
 *          description: Some server error
 * /films:
 *   post:
 *      summary: Create a new Film
 *      tags: [Films]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/Films'
 *      responses:
 *        200:
 *          description: The created movie.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Films'
 *        500:
 *          description: Some server error
 * /films/{id}:
 *   get:
 *      summary: Get the films by id
 *      tags: [Films]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The films by id
 *      responses:
 *        200:
 *          description: The films created by id
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Films'
 *        404:
 *          description: The films was not found
 *   put:
 *      summary: Update the films by id
 *      tags: [Films]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The films by id
 *      requestBody:
 *          required: true
 *          content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Films'
 *      responses:
 *        200:
 *          description: The films was updated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Films'
 *        404:
 *          description: The films was not found
 *        505:
 *          description: Some error happened
 *   delete:
 *      summary: Remove the films by id
 *      tags: [Films]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The films by id
 *
 *      responses:
 *        200:
 *          description: The films created by id
 *        404:
 *          description: The films was not found
 */

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
