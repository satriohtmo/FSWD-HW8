/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - user_name
 *         - email
 *       properties:
 *         user_name:
 *           type: string
 *           description: name of customers
 *         email:
 *           type: string
 *           description: Email of customers
 *
 */
/**

/**
 * @swagger
 * components:
 *   schemas:
 *     Register:
 *       type: object
 *       required:
 *         - user_name
 *         - email
 *         - password
 *       properties:
 *         user_name:
 *           type: string
 *           description: name of customers
 *         email:
 *           type: string
 *           description: Email of customers
 *         password:
 *           type: string
 *           description: Password of customers
 *
 */
/**

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: Email of customers
 *         password:
 *           type: string
 *           description: Password of customers
 *
 */
/** 

/**
 * @swagger
 * tags:
 *    name: Users
 *    description: The User managing API
 * /register:
 *   post:
 *      summary: Create a new User
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/Register'
 *      responses:
 *        200:
 *          description: New User successfully created.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Register'
 *        500:
 *          description: Some server error
 * /login:
 *   post:
 *      summary: User log in
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/Login'
 *      responses:
 *        200:
 *          description: Log in successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Login'
 *        404:
 *          description: The User was not found
 * /users?page={page}&size={size}:
 *    get:
 *      summary: Get all users by pagination
 *      tags: [Users]
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
 */

const { comparePassword } = require("../helpers/bcrypt");
const { generteToken } = require("../helpers/jwt");
const { User } = require("../models");

class Controller {
  static async register(req, res, next) {
    try {
      const { user_name, email, password } = req.body;
      const newUser = await User.create({
        user_name,
        email,
        password,
      });
      res.status(201).json({
        statusCode: 201,
        msg: `User with id ${newUser.id} successfully created`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "EmailRequired" };
      } else if (!password) {
        throw { name: "PasswordRequired" };
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "Unauthorized" };
      }
      const validPassword = comparePassword(password, user.password);
      if (!validPassword) {
        throw { name: "Unauthorized" };
      }
      const payload = { id: user.id };
      const token = generteToken(payload);
      res.status(200).json({ statusCode: 200, access_token: token, user_name: user.user_name });
    } catch (err) {
      next(err);
    }
  }

  static async getUser(req, res, next) {
    try {
      const { page, size } = req.query;
      const user = await User.findAndCountAll({
        limit: size,
        offset: page * size,
        attributes: {
          exclude: ["id", "password", "createdAt", "updatedAt"],
        },
      });
      res.status(200).json({ data: user });
    } catch (err) {
      next(err);
    }
  }

  static async editUser(req, res, next) {
    const { user_name, email, password } = req.body;
    const { id } = req.params;
    try {
      const editUser = await User.update(
        {
          user_name,
          email,
          password,
          photo: req.file.path,
        },
        { where: { id } }
      );
      res.status(200).json({
        statusCode: 200,
        data: editUser,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const deleteUser = User.destroy({ where: id });
      if (deleteUser <= 0) {
        throw { name: "NotFound" };
      }
      res.status(200).json({ statusCode: 200, msg: `user with ${id} has been deleted` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
