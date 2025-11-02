// // const {model} = require('mongoose');

// // const {HoldingsSchema} = require('../schemas/HoldingsSchema');

// // const HoldingsModel = model('Holding',HoldingsSchema);

// // module.exports = {HoldingsModel};

// const mongoose = require('mongoose'); // Import the full mongoose library

// // Import the schema directly (no curly braces)
// const HoldingsSchema = require('../schemas/HoldingsSchema'); 

// // Create the model using mongoose.model
// const HoldingsModel = mongoose.model('Holding', HoldingsSchema);

// // Export the model using the standard method
// module.exports = { HoldingsModel };


// backend/models/HoldingsModel.js

const mongoose = require('mongoose');

// --- STEP A: DEFINE THE SCHEMA DIRECTLY IN THIS FILE ---
// We are no longer importing this from the '/schemas' folder.
const HoldingsSchema = new mongoose.Schema({
    name: String,
    qty: Number,
    avg: Number,
    price: Number,
    net: String,
    day: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

// --- STEP B: CREATE AND EXPORT THE MODEL ---
// We create the model from the schema we just defined above.
const HoldingsModel = mongoose.model('Holding', HoldingsSchema);

// --- STEP C: USE A STANDARD EXPORT ---
// This is the most common and reliable way to export a Mongoose model.
module.exports = HoldingsModel; // Note: We are not exporting an object { HoldingsModel }