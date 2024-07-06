const mongoose = require('mongoose');

// Define the schema for a Person document
const PersonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ["chef", "manager", "labour"],
        required: true
    },
    mobile: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number
    }
});

module.exports = mongoose.model('Person', PersonSchema);
