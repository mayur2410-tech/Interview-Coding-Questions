const express = require("express");
const {authMiddleware,roleMiddleware} = require("../../middleware/auth.middleware");
const { createClass } = require("../../controller/Class/Class");
const { route } = require("../authRoutes/authRoutes");
const router = express.Router();

router.post('/create-class',authMiddleware,roleMiddleware("teacher"),createClass)

module.exports = router