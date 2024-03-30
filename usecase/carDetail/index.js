const carDetailRepo = require("../../repository/carDetail")

exports.getCarDetails = async () => {
  const data = await carDetailRepo.getCarDetails();
  return data;
};

exports.getCarDetail = async (id) => {
  const data = await carDetailRepo.getCarDetail(id);
  return data;
};

exports.updateCarDetail = async (id, payload) => {
  await carDetailRepo.updateCarDetail(id, payload);
  const data = await carDetailRepo.updateCarDetail(id);
  return data;
};

exports.addCarDetail = async (payload) => {
  const data = await carDetailRepo.addCarDetail(payload);
  return data;
};

exports.deleteCarDetail = async (id) => {
  const data = await carDetailRepo.deleteCarDetail(id);
  return data;
};