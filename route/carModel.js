const express = require("express");
const router = express.Router();
const carModelController = require("../controller/carModel");

/* Add routes */
router
  .route("/")
  .get(carModelController.getCarModels)
  .post(carModelController.addCarModel);

router
  .route("/:id")
  .get(carModelController.getCarModel)
  .put(carModelController.updateCarModel)
  .delete(carModelController.deleteCarModel);

module.exports = router;
