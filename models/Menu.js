const mongoose = require('mongoose');

// Define the schema for a Person document
const MenuSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    ingredients: {
        type: String,
        enum: ["salt", "spicy", "sauce"],
        required: true
    },
    taste: {
        type: String
    },
    
})

module.exports = mongoose.model('Menu', MenuSchema);