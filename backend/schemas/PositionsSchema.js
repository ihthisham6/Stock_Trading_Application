// const { Schema } = require("mongoose");

// const PositionsSchema = new Schema({
//   product: String,
//   name: String,
//   qty: Number,
//   avg: Number,
//   price: Number,
//   net: String,
//   day: String,
//   isLoss: Boolean,

//    userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User', // This creates a link to your UserModel
//     required: true,
//   },
// });

// module.exports = { PositionsSchema };


// backend/schemas/PositionsSchema.js

const mongoose = require('mongoose'); // Import the full mongoose library

const PositionsSchema = new mongoose.Schema({
  product: String,
  name: String,
  qty: Number,
  avg: Number,
  price: Number,
  net: String,
  day: String,
  isLoss: Boolean,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

// Export the schema object directly
module.exports = PositionsSchema;