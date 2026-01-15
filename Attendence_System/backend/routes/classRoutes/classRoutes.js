const express = require("express");
const {authMiddleware,roleMiddleware} = require("../../middleware/auth.middleware");
const { createClass,addStudent ,getClass} = require("../../controller/Class/Class");
const router = express.Router();

router.post('/class',authMiddleware,roleMiddleware("teacher"),createClass)
router.post('/class/:id/add-student',authMiddleware,roleMiddleware("teacher"),addStudent)
router.get('/class/:id',authMiddleware,getClass)

module.exports = router