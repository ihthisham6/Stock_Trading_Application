// const { model } = require("mongoose");

// const { PositionsSchema } = require("../schemas/PositionsSchema");

// const PositionsModel = new model("position", PositionsSchema);

// module.exports = { PositionsModel };

// backend/models/PositionsModel.js

const mongoose = require('mongoose'); // Import the full mongoose library

// Import the schema directly (no curly braces)
const PositionsSchema = require('../schemas/PositionsSchema');

// Create the model using mongoose.model
// Mongoose will automatically create a collection named 'positions' from the singular 'Position'
const PositionsModel = mongoose.model('Position', PositionsSchema);

// Export the model using the standard method
module.exports = { PositionsModel };