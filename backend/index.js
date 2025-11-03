require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const cookieParser = require("cookie-parser");
// At the top of backend/index.js
const { userVerification } = require('./middleware/AuthMiddleware');

// --- Import Routes ---
const authRoute = require("./routes/AuthRoute.js");

// --- Import Models (This is fine) ---
//const { HoldingsModel } = require("./models/HoldingsModel.js");
const WatchlistModel = require('./models/WatchlistModel');
const HoldingsModel = require("./models/HoldingsModel.js");
const { OrdersModel } = require("./models/OrdersModel.js");
const { PositionsModel } = require("./models/PositionsModel.js");
const UserModel = require('./models/UserModel');

// --- Environment Variables ---
const PORT = process.env.PORT || 3002;
const mongoURL = process.env.MONGO_URL;

const app = express();

// --- 1. MIDDLEWARE SETUP (MUST be before routes) ---
app.use(
  cors({
    origin: [process.env.VITE_DASHBOARD_URL, process.env.VITE_API_URL], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json()); // Modern equivalent of bodyParser.json()
app.use(cookieParser());

// --- 2. ROUTES REGISTRATION ---
app.use("/", authRoute); // For /login, /signup

// Your existing API routes for data
app.get('/allHoldings',userVerification, async (req, res) => {
  let allHoldings = await HoldingsModel.find({userId: req.userId});
  res.json(allHoldings);
});

app.get('/allPositions',userVerification, async (req, res) => {
  let allPositions = await PositionsModel.find({userId: req.userId});
  res.json(allPositions);
});

// ==========================================================
// ============== NEW ROUTE FOR FETCHING ORDERS ===============
// ==========================================================
app.get('/allOrders', userVerification, async (req, res) => {
    try {
        // Find all orders that belong to the logged-in user
        const allOrders = await OrdersModel.find({ userId: req.userId })
            // Sort by the '_id' field in descending order (-1).
            // Mongoose ObjectIDs contain a timestamp, so sorting by _id is an
            // efficient way to sort by creation time.
            .sort({ _id: -1 }); 

        res.json(allOrders);
    } catch (error) {
        console.error("Failed to fetch orders:", error);
        res.status(500).json({ message: "An error occurred while fetching orders." });
    }
});


// ==========================================================
// ==================== NEW API ROUTES ========================
// ==========================================================


// In backend/index.js

app.get('/stock-search/:keywords', userVerification, async (req, res) => {
    const keywords = req.params.keywords;
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

    // --- DEBUGGING: Log to make sure the key is loaded ---
    console.log(`Searching for '${keywords}' with API Key: ${apiKey ? 'Loaded' : 'MISSING!'}`);

    if (!apiKey) {
        return res.status(500).json({ message: "API key is not configured on the server." });
    }

    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${apiKey}`;

    try {
        const response = await axios.get(url);

        // --- DEBUGGING: Log the response from Alpha Vantage ---
        console.log("Alpha Vantage Response:", response.data);

        // Check for API limit note or other errors
        if (response.data.Note || !response.data.bestMatches) {
            console.error("Alpha Vantage API limit likely reached or no matches found.");
            return res.status(503).json({ message: 'Error from stock API. Please try again later.' });
        }

        const bestMatches = response.data.bestMatches.slice(0, 5);
        res.json(bestMatches);

    } catch (error) {
        // --- DEBUGGING: Log the full error ---
        console.error("Error calling Alpha Vantage API:", error.message);
        res.status(500).json({ message: "Failed to fetch stock data from the external API." });
    }
});


// --- 2. GET USER'S WATCHLIST ---
app.get('/watchlist', userVerification, async (req, res) => {
    try {
        let watchlist = await WatchlistModel.findOne({ userId: req.userId });
        if (!watchlist) {
            // If user has no watchlist, create an empty one for them
            watchlist = new WatchlistModel({ userId: req.userId, symbols: [] });
            await watchlist.save();
        }
        res.json(watchlist.symbols);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch watchlist." });
    }
});

app.get('/profile', userVerification, async (req, res) => {
    try {
        // req.userId is from our middleware. Find the user but exclude the password field.
        const user = await UserModel.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user); // Send the user object back
    } catch (error) {
        res.status(500).json({ message: "Server error while fetching profile." });
    }
});

// ==========================================================
// ================= NEW ROUTE FOR MARKET INDICES ===============
// ==========================================================
app.get('/market-indices', userVerification, async (req, res) => {
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
    const niftySymbol = 'NSEI';
    const sensexSymbol = 'BSESN';

    const niftyUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${niftySymbol}&apikey=${apiKey}`;
    const sensexUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${sensexSymbol}&apikey=${apiKey}`;

    try {
        // Use Promise.all to fetch both data points concurrently for efficiency
        const [niftyResponse, sensexResponse] = await Promise.all([
            axios.get(niftyUrl),
            axios.get(sensexUrl)
        ]);

        const niftyData = niftyResponse.data['Global Quote'];
        const sensexData = sensexResponse.data['Global Quote'];

        // Check if data was returned successfully
        if (!niftyData || !sensexData || Object.keys(niftyData).length === 0) {
            return res.status(503).json({ message: "Could not fetch index data. API limit may be reached." });
        }

        const formattedResponse = {
            nifty: {
                price: parseFloat(niftyData['05. price']),
                change: parseFloat(niftyData['09. change']),
                changePercent: niftyData['10. change percent']
            },
            sensex: {
                price: parseFloat(sensexData['05. price']),
                change: parseFloat(sensexData['09. change']),
                changePercent: sensexData['10. change percent']
            }
        };

        res.json(formattedResponse);

    } catch (error) {
        console.error("Error fetching market indices:", error.message);
        res.status(500).json({ message: "Failed to fetch index data from external API." });
    }
});


// --- 3. ADD A SYMBOL TO WATCHLIST ---
app.post('/watchlist/add', userVerification, async (req, res) => {
    const { symbol } = req.body;
    if (!symbol) return res.status(400).json({ message: "Symbol is required." });

    try {
        // Find the user's watchlist and add the new symbol if it's not already there
        const result = await WatchlistModel.updateOne(
            { userId: req.userId },
            { $addToSet: { symbols: symbol.toUpperCase() } },
            { upsert: true } // Creates the watchlist if it doesn't exist
        );
        res.status(200).json({ message: `${symbol} added to watchlist.` });
    } catch (error) {
        res.status(500).json({ message: "Failed to add to watchlist." });
    }
});


// --- 4. REMOVE A SYMBOL FROM WATCHLIST ---
app.post('/watchlist/remove', userVerification, async (req, res) => {
    const { symbol } = req.body;
    if (!symbol) return res.status(400).json({ message: "Symbol is required." });

    try {
        // Find the user's watchlist and pull the symbol from the array
        const result = await WatchlistModel.updateOne(
            { userId: req.userId },
            { $pull: { symbols: symbol.toUpperCase() } }
        );
        res.status(200).json({ message: `${symbol} removed from watchlist.` });
    } catch (error) {
        res.status(500).json({ message: "Failed to remove from watchlist." });
    }
});


// ====================================================================
// =================== FINAL ROUTES USING THE FIXED MODEL ===================
// ====================================================================

app.post('/newOrder', userVerification, async (req, res) => {
    const { name, qty, price, mode } = req.body;
    const userId = req.userId;

    const newOrder = new OrdersModel({ name, qty, price, mode, userId });
    await newOrder.save();

    if (mode === 'BUY') {
        try {
            const existingHolding = await HoldingsModel.findOne({ name: name, userId: userId });

            if (existingHolding) {
                const oldQty = existingHolding.qty;
                const oldAvg = existingHolding.avg;
                const newTotalQty = oldQty + qty;
                const newAvgPrice = ((oldQty * oldAvg) + (qty * price)) / newTotalQty;
                existingHolding.qty = newTotalQty;
                existingHolding.avg = newAvgPrice;
                existingHolding.price = price;
                await existingHolding.save();
            } else {
                const newHolding = new HoldingsModel({
                    name, qty, avg: price, price, userId
                });
                await newHolding.save();
            }
        } catch (error) {
            console.error("Holdings update failed:", error);
        }
    }
    res.status(201).json({ message: "Order placed successfully!" });
});


app.post('/sellOrder', userVerification, async (req, res) => {
    const { name, qty } = req.body;
    const userId = req.userId;

    try {
        const holding = await HoldingsModel.findOne({ name: name, userId: userId });

        if (!holding) {
            return res.status(404).json({ message: "Sell failed. You do not own this stock." });
        }
        if (qty > holding.qty) {
            return res.status(400).json({ message: `Sell failed. You only own ${holding.qty}.` });
        }

        holding.qty -= qty;

        if (holding.qty === 0) {
            await HoldingsModel.deleteOne({ _id: holding._id });
        } else {
            await holding.save();
        }

        const newOrder = new OrdersModel({
            name, qty, price: holding.avg, mode: "SELL", userId
        });
        await newOrder.save();
        res.status(201).json({ message: `Successfully sold ${qty} shares of ${name}.` });
    } catch (error) {
        console.error("Sell order failed:", error);
        res.status(500).json({ message: "An error occurred." });
    }
});

// --- 3. DATABASE CONNECTION & SERVER START ---
// This is a safer way to start your server
mongoose.connect(mongoURL)
  .then(() => {
    console.log('DB Connected Successfully');
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB", err);
  });