const asyncwrapper = require('../middlewares/asyncwrapper')
const Patient = require("../models/patient.model")
const Donor = require('../models/donor.models')
const httpsStatusText = require('../utils/httpsStatusText')
const appError = require('../utils/appError')
const { model } = require('mongoose')


const getAllpatients = asyncwrapper( async(req, res, next)=>{
    const query = req.query
    console.log("query: " ,query)
    const limit = query.limit || 100  
    const page  = query.page || 1
    const skip = (page -1 ) * limit

    const patients = await Patient.find({},{"__v":false}).limit(limit).skip(skip)
    res.json({stauts: httpsStatusText.SUCCESS , data:{patients}})
    console.log(patients)
});


const addAllpatient = (req, res) => {
    console.log(req.body);

    if (req.body.hospital === "Hospital A") {
        const patientA = new Patient(req.body);
        patientA.save()
            .then((patientA) => {
                res.send(patientA);
            })
            .catch((e) => {
                res.status(500).send(e); // Sending a proper HTTP status code in case of an error
            });
    }
        
    else if(req.body.hospital === "Hospital B") {
        const patientB = new Patient(req.body);
        patientB.save()
            .then((patientB) => {
                    res.send(patientB);
            })
            .catch((e) => {
                res.status(500).send(e); // Sending a proper HTTP status code in case of an error
            });
        }

        else if(req.body.hospital === "Hospital C") {
            const patientC = new Patient(req.body);
            patientC.save()
                .then((patientC) => {
                    res.send(patientC);
                })
                .catch((e) => {
                    res.status(500).send(e); // Sending a proper HTTP status code in case of an error
                });
        }else {
        res.status(403).send("Invalid hospital"); // Sending a proper HTTP status code for forbidden access
    }
}
///////////////////////////////Get method////////////////////////
// Hospital A 

const getPatientHospitalA = async(req, res, )=>{

    const patient = await Patient.find({hospital:"Hospital A"},{"__v":false})
    res.json({stauts: httpsStatusText.SUCCESS , data:{patient}})
    console.log(patient)

};

// Hospital B
const getPatientHospitalB = async(req, res, )=>{

    const patient = await Patient.find({hospital:"Hospital B"},{"__v":false})
    res.json({stauts: httpsStatusText.SUCCESS , data:{patient}})
    console.log(patient)
    
};

// Hospital C
const getPatientHospitalC = async(req, res, )=>{


    const patient = await Patient.find({hospital:"Hospital C"},{"__v":false})
    res.json({stauts: httpsStatusText.SUCCESS , data:{patient}})
    console.log(patient)
    
};



// update patient information

// Hospital A
const updatePatientHospitalA = async(req, res)=>{
    if(req.body.hospital === "Hospital A"){
        try{
            const _id = req.params.id;

            const updatePatient =await Patient.findByIdAndUpdate(_id,req.body,{
                new:true,
                runValidators:true,
            })

            if(!updatePatient) {
                // return res.json({success : httpsStatusText.FAIL,data:{patient:"patient not found"}})
                return res.send("patient not found");
            }
            return res.json({success:httpsStatusText.SUCCESS,data:{updatePatient}})
        }catch(e){
             res.status(401).json({success:httpsStatusText.ERROR,data:null ,message:e.message,code:401})
        }
    }
    
    else {
        res.status(403).send("Invalid hospital"); // Sending a proper HTTP status code for forbidden access
    }
};

// Hospital B
const updatePatientHospitalB = async(req, res)=>{

    if(req.body.hospital === "Hospital B"){
        try{
            const _id = req.params.id;

            const updatePatient =await Patient.findByIdAndUpdate(_id,req.body,{
                new:true,
                runValidators:true,
            })

            if(!updatePatient) {
                return res.json({success : httpsStatusText.FAIL,data:{patient:"patient not found"}})
                // return res.send("patient not found");
            }
            return res.json({success:httpsStatusText.SUCCESS,data:{updatePatient}})
        }catch(e){
                res.status(401).json({success:httpsStatusText.ERROR,data:null ,message:e.message,code:401})
        }
    }
    
    else {
        res.status(403).send("Invalid hospital"); // Sending a proper HTTP status code for forbidden access
    }
};

// Hospital C
const updatePatientHospitalC = async(req, res)=>{
    if(req.body.hospital === "Hospital C"){
        try{
            const _id = req.params.id;

            const updatePatient =await Patient.findByIdAndUpdate(_id,req.body,{
                new:true,
                runValidators:true,
            })

            if(!updatePatient) {
                // return res.json({success : httpsStatusText.FAIL,data:{patient:"patient not found"}})
                return res.send("patient not found");
            }
            return res.json({success:httpsStatusText.SUCCESS,data:{updatePatient}})
        }catch(e){
                res.status(401).json({success:httpsStatusText.ERROR,data:null ,message:e.message,code:401})
        }
    }
    
    else {
        res.status(403).send("Invalid hospital"); // Sending a proper HTTP status code for forbidden access
    }
}


///delete patient
// Hospital A
const deletePatientHospitalA = async(req, res)=>{
    try {
        const _id = req.params.id;
        const deletePatient = await Patient.findByIdAndDelete(_id);
        if(!deletePatient) {
            return res.json({message : httpsStatusText.FAIL,data:{patient:"patient not found"}})
            // return res.send("patient not found");
        }
        return res.json({success:httpsStatusText.SUCCESS,data:{deletePatient}})
    }catch(e){
         res.status(401).json({success:httpsStatusText.ERROR,data:null,message:e.message,code:401})
    }
};


//Hospital B
const deletePatientHospitalB = async(req, res)=>{
    try {
        const _id = req.params.id;
        const deletePatient = await Patient.findByIdAndDelete(_id);
        if(!deletePatient) {
            return res.json({success : httpsStatusText.FAIL,data:{patient:"patient not found"}})
            // return res.send("patient not found");
        }
        return res.json({success:httpsStatusText.SUCCESS,data:{deletePatient}})
    }catch(e){
         res.status(401).json({success:httpsStatusText.ERROR,data:null,message:e.message,code:401})
    }
};


//Hospital C
const deletePatientHospitalC = async(req, res)=>{
    try {
        const _id = req.params.id;
        const deletePatient = await Patient.findByIdAndDelete(_id);
        if(!deletePatient) {
            return res.json({success : httpsStatusText.FAIL,data:{patient:"patient not found"}})
            // return res.send("patient not found");
        }
        return res.json({success:httpsStatusText.SUCCESS,data:{deletePatient}})
    }catch(e){
         res.status(401).json({success:httpsStatusText.ERROR,data:null,message:e.message,code:401})
    }
};


const getBloodHospitalA = async (req, res) => {
    try {
        const _id = req.params.id;
        const infoPatient = await Patient.findById(_id);
        
        if (!infoPatient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        // Find donors matching the criteria and sort them by bloodAmount in descending order
        const donors = await Donor.find({ 
            hospital: 'Hospital A',
            bloodType: infoPatient.bloodType,
            date: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000 ) }
        }).sort({ bloodAmount: -1 });

        // Initialize the remaining blood amount needed
        let remainingBloodAmount = infoPatient.bloodAmount;

        // Iterate through donors and deduct blood amount from each one until the required amount is fulfilled
        for (const donor of donors) {
            if (remainingBloodAmount <= 0) break; // Exit loop if the required amount is fulfilled
            const amountToDeduct = Math.min(remainingBloodAmount, donor.bloodAmount);
            await Donor.findByIdAndUpdate(donor._id, { $inc: { bloodAmount: -amountToDeduct } });
            remainingBloodAmount -= amountToDeduct;
        }

        if (remainingBloodAmount > 0) {
            return res.status(400).json({ message: "Insufficient blood amount available" });
        }

        // Update patient's blood amount to zero
        await Patient.findByIdAndUpdate(_id, { $set: { bloodAmount: 0 } });

        return res.status(200).json({ message: "Blood amount deducted successfully" });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



const getBloodHospitalB = async (req, res) => {
    try {
        const _id = req.params.id;
        const infoPatient = await Patient.findById(_id);
        
        if (!infoPatient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        // Find donors matching the criteria and sort them by bloodAmount in descending order
        const donors = await Donor.find({ 
            hospital: 'Hospital B',
            bloodType: infoPatient.bloodType,
            date: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000 ) }
        }).sort({ bloodAmount: -1 });

        // Initialize the remaining blood amount needed
        let remainingBloodAmount = infoPatient.bloodAmount;

        // Iterate through donors and deduct blood amount from each one until the required amount is fulfilled
        for (const donor of donors) {
            if (remainingBloodAmount <= 0) break; // Exit loop if the required amount is fulfilled
            const amountToDeduct = Math.min(remainingBloodAmount, donor.bloodAmount);
            await Donor.findByIdAndUpdate(donor._id, { $inc: { bloodAmount: -amountToDeduct } });
            remainingBloodAmount -= amountToDeduct;
        }

        if (remainingBloodAmount > 0) {
            return res.status(400).json({ message: "Insufficient blood amount available" });
        }

        // Update patient's blood amount to zero
        await Patient.findByIdAndUpdate(_id, { $set: { bloodAmount: 0 } });

        return res.status(200).json({ message: "Blood amount deducted successfully" });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getBloodHospitalC = async (req, res) => {
    try {
        const _id = req.params.id;
        const infoPatient = await Patient.findById(_id);
        
        if (!infoPatient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        // Find donors matching the criteria and sort them by bloodAmount in descending order
        const donors = await Donor.find({ 
            hospital: 'Hospital C',
            bloodType: infoPatient.bloodType,
            date: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000 ) }
        }).sort({ bloodAmount: -1 });

        // Initialize the remaining blood amount needed
        let remainingBloodAmount = infoPatient.bloodAmount;

        // Iterate through donors and deduct blood amount from each one until the required amount is fulfilled
        for (const donor of donors) {
            if (remainingBloodAmount <= 0) break; // Exit loop if the required amount is fulfilled
            const amountToDeduct = Math.min(remainingBloodAmount, donor.bloodAmount);
            await Donor.findByIdAndUpdate(donor._id, { $inc: { bloodAmount: -amountToDeduct } });
            remainingBloodAmount -= amountToDeduct;
        }

        if (remainingBloodAmount > 0) {
            return res.status(400).json({ message: "Insufficient blood amount available" });
        }

        // Update patient's blood amount to zero
        await Patient.findByIdAndUpdate(_id, { $set: { bloodAmount: 0 } });

        return res.status(200).json({ message: "Blood amount deducted successfully" });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};








module.exports={
    getAllpatients,
    addAllpatient,
    getPatientHospitalA,
    getPatientHospitalB,
    getPatientHospitalC,
    deletePatientHospitalA,
    deletePatientHospitalB,
    deletePatientHospitalC,
    updatePatientHospitalA,
    updatePatientHospitalB,
    updatePatientHospitalC,
    getBloodHospitalA,
    getBloodHospitalB,
    getBloodHospitalC


}