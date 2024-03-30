const express = require("express");
const router = express.Router();
const carDetailController = require("../controller/carDetail");

/* Add routes */
router
  .route("/")
  .get(carDetailController.getCarDetails)
  .post(carDetailController.addCarDetail);

router
  .route("/:id")
  .get(carDetailController.getCarDetail)
  .put(carDetailController.updateCarDetail)
  .delete(carDetailController.deleteCarDetail);

module.exports = router;
