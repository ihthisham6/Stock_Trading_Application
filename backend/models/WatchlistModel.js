// backend/models/WatchlistModel.js
const mongoose = require('mongoose');

const WatchlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // We will store an array of stock symbols (e.g., "IBM", "AAPL")
    symbols: [{
        type: String,
        uppercase: true
    }]
});

const WatchlistModel = mongoose.model('Watchlist', WatchlistSchema);
module.exports = WatchlistModel;