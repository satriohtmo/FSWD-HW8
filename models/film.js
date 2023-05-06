"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Film extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Film.belongsTo(models.Actor, { foreignKey: "actorId" });
      Film.belongsTo(models.Category, { foreignKey: "categoryId" });
    }
  }
  Film.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      release_year: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
      actorId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Film",
    }
  );
  return Film;
};
