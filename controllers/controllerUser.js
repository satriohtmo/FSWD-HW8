const { comparePassword } = require("../helpers/bcrypt");
const { generteToken } = require("../helpers/jwt");
const { User } = require("../models");

class Controller {
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
}

module.exports = Controller;
