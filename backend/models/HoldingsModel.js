// const {model} = require('mongoose');

// const {HoldingsSchema} = require('../schemas/HoldingsSchema');

// const HoldingsModel = model('Holding',HoldingsSchema);

// module.exports = {HoldingsModel};

const mongoose = require('mongoose'); // Import the full mongoose library

// Import the schema directly (no curly braces)
const HoldingsSchema = require('../schemas/HoldingsSchema'); 

// Create the model using mongoose.model
const HoldingsModel = mongoose.model('Holding', HoldingsSchema);

// Export the model using the standard method
module.exports = { HoldingsModel };