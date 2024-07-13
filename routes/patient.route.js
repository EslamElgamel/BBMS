const express = require("express")

const Patient = require("../models/patient.model");
const patientController = require('../controllers/patient.controllers')
const httpsStatusText = require('../utils/httpsStatusText')
const verifyToken    = require("../middlewares/verfiyToken")
const userRoles = require("../utils/userRoles");
const allowedTo = require('../middlewares/allowedTo');

const router = express.Router();

// post AllPatient fo three Hospital
router.post('/addPatiant',verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN1,userRoles.ADMIN2,userRoles.ADMIN3),
    patientController.addAllpatient );



// getAllpatient for three hospital =================>
router.get("/getPatientA",verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN1,userRoles.USER),patientController.getPatientHospitalA)

router.get("/getPatientB",verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN2,userRoles.USER),patientController.getPatientHospitalB)

router.get("/getPatientC",verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN3,userRoles.USER),patientController.getPatientHospitalC)



// update patient for three hospital
router.patch('/updatePatientA/:id',verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN1),patientController.updatePatientHospitalA)


router.patch('/updatePatientB/:id',verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN2),patientController.updatePatientHospitalB)


router.patch('/updatePatientC/:id',verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN3),patientController.updatePatientHospitalC)



//Delete patient
router.delete('/deletePatientA/:id',verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN1),patientController.deletePatientHospitalA)

router.delete('/deletePatientB/:id',verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN2),patientController.deletePatientHospitalB)

router.delete('/deletePatientC/:id',verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN3),patientController.deletePatientHospitalC)


router.get('/getBloodHospitalA/:id',verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN1)
,patientController.getBloodHospitalA)

router.get('/getBloodHospitalB/:id',verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN2),patientController.getBloodHospitalB)

router.get('/getBloodHospitalC/:id',
verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN3),patientController.getBloodHospitalC)








module.exports=router