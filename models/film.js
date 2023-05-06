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
      Film.belongsTo(models.Actor, { foreignKey: "ActorId" });
      Film.belongsTo(models.Category, { foreignKey: "CategoryId" });
    }
  }
  Film.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      release_year: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
      ActorId: DataTypes.INTEGER,
      CategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Film",
    }
  );
  return Film;
};
