const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// need to find better address regex.
const addressRegex = /A-Za-z0-9'\.\-\s\,/;


const GarageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    numberSpots: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        match: addressRegex,
        required: true
    },
    spotsArray: [{
        level: {
            type: String,
            required: true
        },
        spotNumber: {
            type: String,
            required: true
        },
        isOpen: {
            type: Boolean,
            required: true
        }
    }
    ]
})

module.exports = Garage = mongoose.model("garage", GarageSchema);