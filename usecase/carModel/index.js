const carModelRepo = require("../../repository/carModel");

exports.getCarModels = async () => {
  const data = await carModelRepo.getCarModels();
  return data;
};

exports.getCarModel = async (id) => {
  const data = await carModelRepo.getCarModel(id);
  return data;
};

exports.updateCarModel = async (id, payload) => {
  await carDetailRepo.updateCar(id, payload);
  const data = await carModelRepo.getCarModel(id);
  return data;
};

exports.addCarModel = async (payload) => {
  const data = await carModelRepo.addCarModel(payload);
  return data;
};

exports.deleteCarModel = async (id) => {
  const data = await carModelRepo.deleteCarModel(id);
  return data;
};
