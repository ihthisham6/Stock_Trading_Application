// const { model } = require("mongoose");

// const { OrdersSchema } = require("../schemas/OrdersSchema");

// const OrdersModel = new model("order", OrdersSchema);

// module.exports = { OrdersModel };

const mongoose = require('mongoose');
const OrdersSchema = require('../schemas/OrdersSchema');

const OrdersModel = mongoose.model('Order', OrdersSchema);

module.exports = { OrdersModel };