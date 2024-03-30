"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      car.hasMany(models.carModel, { foreignKey: "car_id" });
    }
  }
  car.init(
    {
      manufacture: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "car",
      paranoid: true, // enable soft delete
    }
  );
  return car;
};
