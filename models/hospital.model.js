const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    hospitalName: {
        type: String,
        enum: ['Hospital A', 'Hospital B'],
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    }
});

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
