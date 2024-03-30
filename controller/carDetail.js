const carDetailUsecase = require("../usecase/carDetail");

exports.getCarDetails = async (req, res, next) => {
  try {
    const data = await carDetailUsecase.getCarDetails();

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCarDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await carDetailUsecase.getCarDetail(id);

    if (!data) {
      return next({
        message: `Car with id ${id} is not found!`,
        statusCode: 404,
      });
    }

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateCarDetail = async (req, res, next) => {
  try {
    // validate user
    const { id } = req.params;
    const {
      car_model_id,
      plate,
      rentPerDay,
      available,
      capacity,
      description,
    } = req.body;
    if (!car_model_id || car_model_id == "") {
      return next({
        statusCode: 400,
        message: "Car model id must be filled!",
      });
    }
    if (!plate || plate == "") {
      return next({
        statusCode: 400,
        message: "Plate model must be filled!",
      });
    }
    if (!rentPerDay || rentPerDay == "") {
      return next({
        statusCode: 400,
        message: "Rent Per Day must be filled!",
      });
    }
    if (!available || available == "") {
      return next({
        statusCode: 400,
        message: "Available model id must be filled!",
      });
    }
    if (!description || description == "") {
      return next({
        statusCode: 400,
        message: "Description model id must be filled!",
      });
    }

    const data = await carDetailUsecase.updateCarDetail(id, {
      car_model_id,
      plate,
      rentPerDay,
      available,
      capacity,
      description,
    });

    res.status(200).json({
      message: "Update Success!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.addCarDetail = async (req, res, next) => {
  try {
    // validate user
    const {
      car_model_id,
      plate,
      rentPerDay,
      available,
      capacity,
      description,
    } = req.body;
    const { image } = req.files;

    if (!car_model_id || car_model_id == "") {
      return next({
        statusCode: 400,
        message: "Car model id must be filled!",
      });
    }
    if (!plate || plate == "") {
      return next({
        statusCode: 400,
        message: "Plate must be filled!",
      });
    }
    if (!rentPerDay || rentPerDay == "") {
      return next({
        statusCode: 400,
        message: "Rent Per Day must be filled!",
      });
    }
    if (!available || available == "") {
      return next({
        statusCode: 400,
        message: "Available must be filled!",
      });
    }
    if (!description || description == "") {
      return next({
        statusCode: 400,
        message: "Description must be filled!",
      });
    }
    if (!capacity || capacity == "") {
      return next({
        statusCode: 400,
        message: "Capacity must be filled!",
      });
    }

    const data = await carDetailUsecase.addCarDetail({
      car_model_id,
      plate,
      rentPerDay,
      available,
      description,
      capacity,
      image,
    });

    res.status(200).json({
      message: "Add Car Success!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteCarDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next({
        message: `Car with id ${id} is not found!`,
        statusCode: 404,
      });
    }

    const data = await carDetailUsecase.deleteCarDetail(id);

    res.status(200).json({
      message: "Delete Car Successs!",
      data,
    });
  } catch (error) {
    next(error);
  }
};
