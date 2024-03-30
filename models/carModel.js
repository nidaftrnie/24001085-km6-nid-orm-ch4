"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class carModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      carModel.belongsTo(models.car, { foreignKey: "car_id" });
      carModel.hasOne(models.carDetail, { foreignKey: "car_model_id" });
    }
  }
  carModel.init(
    {
      car_id: DataTypes.INTEGER,
      model: DataTypes.STRING,
      transmission: DataTypes.STRING,
      type: DataTypes.STRING,
      year: DataTypes.STRING,
      options: DataTypes.ARRAY(DataTypes.STRING),
      specs: DataTypes.ARRAY(DataTypes.STRING),
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "carModel",
      paranoid: true, //enable soft delete
    }
  );
  return carModel;
};
