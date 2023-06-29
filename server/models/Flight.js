const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    flightNumber: {
        type: Number,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    departureTime: {
        type: Date,
        required: true
    },
    arrivalTime: {
        type: Date,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
})

const flight = mongoose.model('flight', flightSchema);
module.exports = flight;