const { Actor } = require("../models");

class Controller {
  static async getActor(req, res) {
    try {
      const actor = await Actor.findAll({
        attributes: {
          exclude: ["id", "createdAt", "updatedAt"],
        },
      });
      res.status(200).json({ data: actor });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Controller;
