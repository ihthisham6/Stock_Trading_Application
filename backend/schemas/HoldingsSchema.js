const mongoose = require('mongoose');

const HoldingsSchema = new mongoose.Schema({
    name:String,
    qty: Number,
    avg: Number,
    price: Number,
    net: String,
    day: String,

     userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // This creates a link to your UserModel
    required: true,
  },
});

module.exports ={ HoldingsSchema };