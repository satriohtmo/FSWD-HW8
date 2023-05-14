const { User } = require("../models");
const { readToken } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const decodedToken = readToken(access_token);
    const user = await User.findOne({ where: { id: decodedToken.id } });
    if (!user) {
      throw { name: "Unauthorized" };
    }
    req.user = { id: user.id, email: user.email };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
