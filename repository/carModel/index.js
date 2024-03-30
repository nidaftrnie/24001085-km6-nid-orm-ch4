const { carModel, carDetail } = require("../../models");
const { getData, setData, deleteData } = require("../../helper/redis");

exports.getCarModels = async () => {
  const data = await carModel.findAll({
    include: {
      model: carDetail,
    },
  });

  return data;
};

exports.getCarModel = async (id) => {
  const key = `cars:${id}`;

  // check redis and if there are any data return data from redis
  let data = await getData(key);
  if (data) {
    return data;
  }

  //get data from postgres
  data = await carModel.findAll({
    where: {
      id,
    },
    include: {
      model: carDetail,
    },
  });

  //save to redis
  if (data.length > 0) {
    await setData(key, data[0], 300);

    return data[0];
  }

  throw new Error(`Model car is not found!`);
};

exports.updateCarModel = async (id, payload) => {
  const key = `cars:${id}`;

  //update from postgres
  await carModel.update(payload, {
    where: {
      id,
    },
  });

  // get from postgres
  const data = await carModel.findAll({
    where: {
      id,
    },
  });

  if (data.length > 0) {
    // save to redis
    await setData(key, data[0], 300);

    return data[0];
  }

  throw new Error(`Model car is not found!`);
};

exports.addCarModel = async (payload) => {
  // add to postgres
  const data = await carModel.create(payload);

  // add to redis
  const key = `cars:${data.id}`;
  await setData(key, data, 300);

  return data;
};

exports.deleteCarModel = async (id) => {
  const key = `carmodels:${id}`;

  // delete from postgres
  await carModel.destroy({ where: { id } });

  // delete from redis
  await deleteData(key);

  return null;
};
