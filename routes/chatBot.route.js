const express = require("express")
const chatBotController = require('../controllers/chatBot.controllers')
const verifyToken = require("../middlewares/verfiyToken")
const userRoles = require("../utils/userRoles");
const allowedTo = require('../middlewares/allowedTo');

const router = express.Router();


// router.post('/nearestPlace',chatBotController.nearestPlace)

// router.post('/searchByBloodType',chatBotController.chatBot )

router.post('/searchBloodType',chatBotController.searchBloodType)

module.exports = router