const { car, carModel} = require("../../models");
const { getData, setData, deleteData } = require("../../helper/redis");

exports.getCars = async () => {
  const data = await car.findAll({
    include: {
      model: carModel,
    },
  });

  return data;
};

exports.getCar = async (id) => {
  const key = `cars:${id}`;

  // check redis and if there are any data return data from redis
  let data = await getData(key);
  if (data) {
    return data;
  }

  // get data from database
  data = await car.findAll({
    where: {
      id,
    },
    include: {
      model: carModel,
    },
  });

  // save to redis
  if (data.length > 0) {
    await setData(key, data[0], 300);

    return data[0];
  }

  throw new Error(`Car is not found!`);
};

exports.updateCar = async (id, payload) => {
  const key = `cars:${id}`;

  // update to postgres
  await car.update(payload, {
    where: {
      id,
    },
  });

  // get from postgres
  const data = await car.findAll({
    where: {
      id,
    },
  });

  if (data.length > 0) {
    // save to redis (cache)
    await setData(key, data[0], 300);

    return data[0];
  }

  throw new Error(`Car is not found!`);
};

exports.addCar = async (payload) => {
  // add to postgres
  const data = await car.create(payload);

  // add to redis
  const key = `cars:${data.id}`;
  await setData(key, data, 300);

  return data;
};

exports.deleteCar = async (id) => {
  const key = `cars:${id}`;

  // delete from postgres
  await car.destroy({ where: { id } });

  // delete from redis
  await deleteData(key);

  return null;
};
