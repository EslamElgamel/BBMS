const express = require("express")
const contectController = require('../controllers/contect.controllers')
const router = express.Router();

router.post('/contectUs',contectController.contectUs)

module.exports = router