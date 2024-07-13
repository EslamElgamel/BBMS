const express = require("express")
const donorController = require('../controllers/donor.controller')
const verifyToken = require("../middlewares/verfiyToken")
const userRoles = require("../utils/userRoles");
const allowedTo = require('../middlewares/allowedTo');

const router = express.Router();


// post AllDonor for three Hospital
router.post('/addAllDonor',verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN1,userRoles.ADMIN2,userRoles.ADMIN3),donorController.addAllDonors)



/// get AllDonors for three Hospital 

// Hospital A
router.get('/getDonorHospitalA',verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN1,userRoles.USER),donorController.getDonorHospitalA)



//Hospital B
router.get('/getDonorHospitalB',verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN2,userRoles.USER),donorController.getDonorHospitalB)

//Hospital C
router.get('/getDonorHospitalC',verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN3,userRoles.USER),donorController.getDonorHospitalC)






//get info DeletedDonor

router.get('/getAllDonorDeleted',verifyToken, 
allowedTo(userRoles.MANGER),donorController.getAllDonorDeleted)

router.get('/getDonorDeleteHospitalA',verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN1),donorController.getDonorDeleteHospitalA)

router.get('/getDonorDeleteHospitalB',verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN2),donorController.getDonorDeleteHospitalB)

router.get('/getDonorDeleteHospitalC',verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN3),donorController.getDonorDeleteHospitalC)








// update Donor Information 
// Hospital A Information 
router.patch('/updateDonorHospitalA/:id',verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN1),donorController.updateDonorHospitalA)


// Hospital B Information
router.patch('/updateDonorHospitalB/:id',verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN2),donorController.updateDonorHospitalB);


// Hospital C Information
router.patch('/updateDonorHospitalC/:id',verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN3),donorController.updateDonorHospitalC)




//delete Donor Information

//Hospital A
router.delete('/deleteDonorHospitalA/:id',verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN1),donorController.deleteDonorHospitalA)


//Hospital B
router.delete('/deleteDonorHospitalB/:id',verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN2),donorController.deleteDonorHospitalB)


//Hospital C
router.delete('/deleteDonorHospitalC/:id',verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN3),donorController.deleteDonorHospitalC)













module.exports=router