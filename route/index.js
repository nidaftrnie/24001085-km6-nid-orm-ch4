const express = require("express");
const router = express.Router();
const carRoute = require("./car");
const carModelRoute = require("./carModel");
const carDetailRoute = require("./carDetail");

// /students
router.use("/cars", carRoute);
router.use("/carmodels", carModelRoute);
router.use("/cardetails", carDetailRoute);

module.exports = router;
