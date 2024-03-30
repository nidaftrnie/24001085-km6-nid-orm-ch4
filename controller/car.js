const carUsecase = require("../usecase/car");

exports.getCars = async (req, res, next) => {
  try {
    const data = await carUsecase.getCars();

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await carUsecase.getCar(id);

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

exports.updateCar = async (req, res, next) => {
  try {
    // validate user
    const { id } = req.params;
    const { manufacture} = req.body;
    if (!manufacture || manufacture == "") {
      return next({
        statusCode: 400,
        message: "Manufacture must be filled!",
      });
    }

    const data = await carUsecase.updateCar(id, { manufacture });
    
    res.status(200).json({
      message: "Update Success!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.addCar = async (req, res, next) => {
  try {
    // validate user
    const { manufacture, type, year } = req.body;
    if (!manufacture || manufacture == "") {
      return next({
        statusCode: 400,
        message: "Manufacture must be filled!",
      });
    }

    const data = await carUsecase.addCar({ manufacture });

    res.status(200).json({
      message: "Add Car Success!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next({
        message: `Car with id ${id} is not found!`,
        statusCode: 404,
      });
    }

    const data = await carUsecase.deleteCar(id);

    res.status(200).json({
      message: "Delete Car Successs!",
      data,
    });
  } catch (error) {
    next(error);
  }
};
