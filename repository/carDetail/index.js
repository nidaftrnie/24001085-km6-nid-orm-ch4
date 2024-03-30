const crypto = require("crypto");
const path = require("path");
const { carDetail } = require("../../models");
const { uploader } = require("../../helper/cloudinary");
const { getData, setData, deleteData } = require("../../helper/redis");
const carModel = require("../../models/carModel");

exports.getCarDetails = async () => {
  const data = await carDetail.findAll({});

  return data;
};

exports.getCarDetail = async (id) => {
  const key = `cardetails:${id}`;

  // check redis and if there are any data return data from redis
  let data = await getData(key);
  if (data) {
    return data;
  }

  //get data from database
  data = await carDetail.findAll({
    where: {
      id,
    },
  });

  //save to redis
  if (data.length > 0) {
    await setData(key, data[0], 300);

    return data[0];
  }

  throw new Error(`Detail car is not found!`);
};

exports.updateCarDetail = async (id, payload) => {
  const key = `cardetails:${id}`;

  // update to postgres
  await carDetail.update(payload, {
    where: {
      id,
    },
  });

  // get from postgres
  const data = await carDetail.findAll({
    where: {
      id,
    },
  });
  
  if (data.length > 0) {
    // save to redis
    await setData(key, data[0], 300);

    return data[0];
  }

  return data;
};

exports.addCarDetail = async (payload) => {
  if (payload.image) {
    // upload image to cloudinary
    const { image } = payload;

    // make unique filename -> 213123128uasod9as8djas
    image.publicId = crypto.randomBytes(16).toString("hex");

    // rename the file -> 213123128uasod9as8djas.jpg / 213123128uasod9as8djas.png
    image.name = `${image.publicId}${path.parse(image.name).ext}`;

    // Process to upload image
    const imageUpload = await uploader(image);
    payload.image = imageUpload.secure_url;
  }

  // add to postgres
  const data = await carDetail.create(payload);

  // add to redis
  const key = `cardetails:${data.id}`;
  await setData(key, data, 300);

  return data;
};

exports.deleteCarDetail = async (id) => {
  const key = `cardetails:${id}`;

  // delete from postgres
  await carDetail.destroy({ where: { id } });

  // delete from redis
  await deleteData(key);

  return null;
};
