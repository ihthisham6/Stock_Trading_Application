// const { Schema } = require("mongoose");

// const OrdersSchema = new Schema({
//   name: String,
//   qty: Number,
//   price: Number,
//   mode: String,

//    userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User', // This creates a link to your UserModel
//     required: true,
//   },
// });

// module.exports = { OrdersSchema };


// backend/schemas/OrdersSchema.js

const mongoose = require('mongoose'); // Import the full mongoose library

const OrdersSchema = new mongoose.Schema({
  name: String,
  qty: Number,
  price: Number,
  mode: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

// Export the schema object directly
module.exports = OrdersSchema;