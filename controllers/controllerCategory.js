const { Actor, Category, Film } = require("../models");
const { Op } = require("sequelize");

class Controller {
  static async getAllCategory(req, res) {
    try {
      const category = await Category.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.status(200).json({ data: category });
    } catch (err) {
      console.log(err);
    }
  }

  static async filmByCategory(req, res) {
    try {
      const search = req.params.name;
      const film = await Film.findAll({
        include: [
          { model: Actor, attributes: ["first_name", "last_name"] },
          { model: Category, where: { name: { [Op.iLike]: `%${search}%` } } },
        ],
      });
      if (film.length === 0) {
        console.log("data not found");
        res.status(404).json({ message: "data not found" });
      }
      res.status(200).json({ data: film });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Controller;
