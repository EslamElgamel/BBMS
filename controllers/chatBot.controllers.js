const Donor = require('../models/donor.models')
const Hospitals = require('../models/hospital.model')
const geolib = require('geolib')





const places = [
    
    { latitude: 29.079854985436604, longitude: 31.105923130424692, name: 'Hospital A' },
    { latitude: 28.1238889, longitude: 30.7345833, name: 'Hospital B' },
    { latitude: 29.147444444 ,longitude: 31.129888889, name: "Hospital C"}
];

const searchBloodType = async (req, res) => {
    const selectedBloodType = req.body.selectedBloodType;
    const myLocation = { latitude: req.body.latitude, longitude: req.body.longitude };

    const resultsByBloodType = {};
    const bloodAmounts = {};
    try {
        // Search the database for donors with the specified blood type
        const donors = await Donor.find({ bloodType: selectedBloodType, date: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000 ) } });

        // Extract unique hospital IDs from donors
        const hospitals = [...new Set(donors.map(donor => donor.hospital))];
        const uniqueHospitals = [...new Set(hospitals)];

        // Count the number of unique hospitals
        const hospitalsCount = uniqueHospitals.length;

        // Calculate distances between user location and hospitals
        const distances = uniqueHospitals.map(hospital => ({
            name: hospital,
            distance: geolib.convertDistance(geolib.getDistance(myLocation, places.find(place => place.name === hospital)), 'km')
        }));

        // Find the closest hospital
        const closestHospital = distances.reduce((prev, current) => (prev.distance < current.distance ? prev : current));
        const amountOfBlood = await Donor.find({ bloodType: selectedBloodType, hospital: closestHospital.name, date: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000 ) } });

        const totalBloodAmount = amountOfBlood.reduce((total, donor) => {
            return total + donor.bloodAmount;}, 0);
        
        resultsByBloodType[selectedBloodType] = amountOfBlood;
        bloodAmounts[selectedBloodType] = totalBloodAmount;

        if (donors.length === 0 && hospitalsCount === 0) {
            res.json({ message: 'No donations or hospitals for this blood type in the database' });
        } else {
            res.json({
                // message: Found ${donors.length} donation(s) with the specified blood type and ${hospitalsCount} hospital(s) containing the required blood type in the database,
                hospitals: uniqueHospitals,
                closestHospital: closestHospital,
                BloodAmounts:  bloodAmounts 
            });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports = {
    // chatBot,
    // nearestPlace
    // nearestPlaceAndBloodAvailability
    searchBloodType
}
