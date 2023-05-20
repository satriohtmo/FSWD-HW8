"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      user_name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: DataTypes.STRING,
      photo: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate(user, options) {
          user.password = hashPassword(user.password, 8);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
