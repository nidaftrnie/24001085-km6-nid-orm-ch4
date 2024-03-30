const carModelUsecase = require("../usecase/carModel");

exports.getCarModels = async (req, res, next) => {
  try {
    const data = await carModelUsecase.getCarModels();

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCarModel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await carModelUsecase.getCarModel(id);

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

exports.updateCarModel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { car_id, model, transmission, type, year, options, specs } = req.body;
    if (!car_id || car_id == "") {
      return next({
        statusCode: 400,
        message: "Car id must be filled!",
      });
    }
    if (!model || model == "") {
      return next({
        statusCode: 400,
        message: "model model must be filled!",
      });
    }
    if (!transmission || transmission == "") {
      return next({
        statusCode: 400,
        message: "Transmission Per Day must be filled!",
      });
    }
    if (!type || type == "") {
      return next({
        statusCode: 400,
        message: "Type model id must be filled!",
      });
    }
    if (!year || year == "") {
      return next({
        statusCode: 400,
        message: "Year model id must be filled!",
      });
    }
    if (!options || options == "") {
      return next({
        statusCode: 400,
        message: "Options model id must be filled!",
      });
    }
    if (!specs || specs == "") {
      return next({
        statusCode: 400,
        message: "Specs model id must be filled!",
      });
    }

    const data = await carModelUsecase.updateCarModel(id, {
      car_id,
      model,
      transmission,
      type,
      year,
      options,
      specs,
    });

    res.status(200).json({
      message: "Update Success!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.addCarModel = async (req, res, next) => {
  try {
    const { car_id, model, transmission, type, year, options, specs } =
      req.body;
    if (!car_id || car_id == "") {
      return next({
        statusCode: 400,
        message: "Car id must be filled!",
      });
    }
    if (!model || model == "") {
      return next({
        statusCode: 400,
        message: "model model must be filled!",
      });
    }
    if (!transmission || transmission == "") {
      return next({
        statusCode: 400,
        message: "Transmission must be filled!",
      });
    }
    if (!type || type == "") {
      return next({
        statusCode: 400,
        message: "Type model id must be filled!",
      });
    }
    if (!year || year == "") {
      return next({
        statusCode: 400,
        message: "Year model id must be filled!",
      });
    }
    if (!options || options == "") {
      return next({
        statusCode: 400,
        message: "Options model id must be filled!",
      });
    }
    if (!specs || specs == "") {
      return next({
        statusCode: 400,
        message: "Specs model id must be filled!",
      });
    }

    const data = await carModelUsecase.addCarModel({
      car_id,
      model,
      transmission,
      type,
      year,
      options,
      specs,
    });

    res.status(200).json({
      message: "Add Car Success!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteCarModel = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next({
        message: `Car with id ${id} is not found!`,
        statusCode: 404,
      });
    }

    const data = await carModelUsecase.deleteCarModel(id);

    res.status(200).json({
      message: "Delete Car Successs!",
      data,
    });
  } catch (error) {
    next(error);
  }
};
