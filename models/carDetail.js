"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class carDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      carDetail.belongsTo(models.carModel, { foreignKey: "car_model_id" });
    }
  }
  carDetail.init(
    {
      car_model_id: DataTypes.INTEGER,
      plate: DataTypes.STRING,
      image: DataTypes.TEXT,
      rentPerDay: DataTypes.INTEGER,
      capacity: DataTypes.INTEGER,
      available: DataTypes.BOOLEAN,
      description: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "carDetail",
      paranoid: true, //enable soft delete
    }
  );
  return carDetail;
};
