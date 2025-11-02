require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require("cookie-parser");
// At the top of backend/index.js
const { userVerification } = require('./middleware/AuthMiddleware');

// --- Import Routes ---
const authRoute = require("./routes/AuthRoute.js");

// --- Import Models (This is fine) ---
const { HoldingsModel } = require("./models/HoldingsModel.js");
const { OrdersModel } = require("./models/OrdersModel.js");
const { PositionsModel } = require("./models/PositionsModel.js");

// --- Environment Variables ---
const PORT = process.env.PORT || 3002;
const mongoURL = process.env.MONGO_URL;

const app = express();

// --- 1. MIDDLEWARE SETUP (MUST be before routes) ---
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"], 
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

// app.post('/newOrder', userVerification, async (req, res) => {
//     let newOrder = new OrdersModel({
//         name: req.body.name,
//         qty: req.body.qty,
//         price: req.body.price,
//         mode: req.body.mode,
//           userId: req.userId,

//     });
//     await newOrder.save(); // It's good practice to await this
//     res.send("Order saved!");
// });



// ================================================================
// ==================== UPGRADED NEW ORDER (BUY) ROUTE ====================
// ================================================================
// app.post('/newOrder', userVerification, async (req, res) => {
//     const { name, qty, price, mode } = req.body;
//     const userId = req.userId;

//     // --- Part 1: Save the Order as a Transaction Record ---
//     const newOrder = new OrdersModel({ name, qty, price, mode, userId });
//     await newOrder.save();

//     // --- Part 2: Update Holdings Portfolio if it's a BUY order ---
//     if (mode === 'BUY') {
//         try {
//             const existingHolding = await HoldingsModel.findOne({ name: name, userId: userId });

//             if (existingHolding) {
//                 // --- LOGIC FOR EXISTING HOLDING ---
//                 // If the user already owns this stock, we update the average cost.
//                 const oldQty = existingHolding.qty;
//                 const oldAvg = existingHolding.avg;

//                 // The formula for the new weighted average price
//                 const newTotalQty = oldQty + qty;
//                 const newAvgPrice = ((oldQty * oldAvg) + (qty * price)) / newTotalQty;

//                 // Update the holding with the new values
//                 existingHolding.qty = newTotalQty;
//                 existingHolding.avg = newAvgPrice;
//                 existingHolding.price = price; // Update LTP to the latest buy price

//                 await existingHolding.save();
//             } else {
//                 // --- LOGIC FOR NEW HOLDING ---
//                 // If this is a new stock for the user, create a brand new holding document.
//                 const newHolding = new HoldingsModel({
//                     name: name,
//                     qty: qty,
//                     avg: price, // For the first purchase, the average cost IS the buy price
//                     price: price,
//                     net: "0.00%", // Initialize net/day changes
//                     day: "0.00%",
//                     userId: userId,
//                 });
//                 await newHolding.save();
//             }
//         } catch (error) {
//             console.error("Failed to update holdings after buy order:", error);
//             // This part is for logging. The user's order was still saved successfully.
//         }
//     }

//     res.status(201).send("Order placed and portfolio updated successfully!");
// });
// REPLACE your /newOrder route with this DEBUG version.

// app.post('/newOrder', userVerification, async (req, res) => {
//     // --- DEBUG STEP 1: Log the incoming data ---
//     console.log("--- New Order Request Received ---");
//     console.log("Request Body:", req.body);

//     const { name, qty, price, mode } = req.body;
//     const userId = req.userId;

//     // Save the transaction record.
//     const newOrder = new OrdersModel({ name, qty, price, mode, userId });
//     await newOrder.save();
//     console.log("Order document saved successfully.");

//     if (mode === 'BUY') {
//         try {
//             // --- DEBUG STEP 2: Log what we are searching for ---
//             console.log(`Searching for existing holding with name: ${name} and userId: ${userId}`);
//             const existingHolding = await HoldingsModel.findOne({ name: name, userId: userId });

//             // --- DEBUG STEP 3: Log the result of the search ---
//             console.log("Result of findOne:", existingHolding);

//             if (existingHolding) {
//                 console.log("--- FOUND existing holding. Entering UPDATE logic. ---");
//                 // Update logic here...
//                 const oldQty = existingHolding.qty;
//                 const oldAvg = existingHolding.avg;
//                 const newTotalQty = oldQty + qty;
//                 const newAvgPrice = ((oldQty * oldAvg) + (qty * price)) / newTotalQty;
//                 existingHolding.qty = newTotalQty;
//                 existingHolding.avg = newAvgPrice;
//                 existingHolding.price = price;
//                 await existingHolding.save();
//                 console.log("--- Holding UPDATED successfully. ---");

//             } else {
//                 console.log("--- DID NOT find existing holding. Entering CREATE logic. ---");
//                 // Create logic here...
//                 const newHolding = new HoldingsModel({
//                     name: name,
//                     qty: qty,
//                     avg: price,
//                     price: price,
//                     userId: userId,
//                 });
//                 await newHolding.save();
//                 console.log("--- New holding CREATED successfully. ---");
//             }
//         } catch (error) {
//             console.error("!!! CRITICAL ERROR in holdings update !!!:", error);
//         }
//     }

//     res.status(201).json({ message: "Order placed and portfolio updated successfully!" });
// });

// ==========================================================
// ================= FINAL, ROBUST /newOrder ROUTE =================
// ==========================================================
// app.post('/newOrder', userVerification, async (req, res) => {
//     const { name, qty, price, mode } = req.body;
//     const userId = req.userId;

//     // Save the transaction record first. This part works perfectly.
//     const newOrder = new OrdersModel({ name, qty, price, mode, userId });
//     await newOrder.save();

//     if (mode === 'BUY') {
//         try {
//             // Find the existing holding using a more direct query method.
//             // This is less prone to subtle schema/type issues.
//             const existingHolding = await HoldingsModel.findOne({ 
//                 name: name, 
//                 userId: new mongoose.Types.ObjectId(userId) // Explicitly cast userId to an ObjectId
//             });

//             if (existingHolding) {
//                 // --- UPDATE LOGIC ---
//                 const oldQty = existingHolding.qty;
//                 const oldAvg = existingHolding.avg;
//                 const newTotalQty = oldQty + qty;
//                 const newAvgPrice = ((oldQty * oldAvg) + (qty * price)) / newTotalQty;

//                 // Update the document found.
//                 existingHolding.qty = newTotalQty;
//                 existingHolding.avg = newAvgPrice;
//                 existingHolding.price = price;
                
//                 await existingHolding.save();
//                 console.log(`--- Holding for ${name} UPDATED successfully. ---`);

//             } else {
//                 // --- CREATE LOGIC ---
//                 const newHolding = new HoldingsModel({
//                     name: name,
//                     qty: qty,
//                     avg: price,
//                     price: price,
//                     userId: userId
//                 });
//                 await newHolding.save();
//                 console.log(`--- New holding for ${name} CREATED successfully. ---`);
//             }
//         } catch (error) {
//             console.error("!!! CRITICAL ERROR in holdings update/create !!!:", error);
//         }
//     }

//     res.status(201).json({ message: "Order placed and portfolio updated successfully!" });
// });

// ==========================================================
// ================= FINAL, ROBUST /newOrder ROUTE =================
// ==========================================================
app.post('/newOrder', userVerification, async (req, res) => {
    const { name, qty, price, mode } = req.body;
    const userId = req.userId;

    const newOrder = new OrdersModel({ name, qty, price, mode, userId });
    await newOrder.save();

    if (mode === 'BUY') {
        try {
            // This query is more robust and guaranteed to find the holding if it exists.
            const existingHolding = await HoldingsModel.findOne({ 
                name: name, 
                userId: new mongoose.Types.ObjectId(userId)
            });

            if (existingHolding) {
                // --- UPDATE LOGIC ---
                const oldQty = existingHolding.qty;
                const oldAvg = existingHolding.avg;
                const newTotalQty = oldQty + qty;
                const newAvgPrice = ((oldQty * oldAvg) + (qty * price)) / newTotalQty;

                existingHolding.qty = newTotalQty;
                existingHolding.avg = newAvgPrice;
                existingHolding.price = price;
                await existingHolding.save();

            } else {
                // --- CREATE LOGIC ---
                const newHolding = new HoldingsModel({
                    name: name, qty: qty, avg: price, price: price, userId: userId
                });
                await newHolding.save();
            }
        } catch (error) {
            console.error("!!! CRITICAL ERROR in holdings update/create !!!:", error);
        }
    }
    res.status(201).json({ message: "Order placed and portfolio updated successfully!" });
});
// ==========================================================
// ==================== NEW SELL ORDER ROUTE ====================
// ==========================================================
app.post('/sellOrder', userVerification, async (req, res) => {
    // We expect the stock's name and the quantity to sell from the frontend
    const { name, qty } = req.body;
    const userId = req.userId;

    // --- Basic Validation ---
    if (!name || !qty || qty <= 0) {
        return res.status(400).json({ message: "Invalid order details provided." });
    }

    try {
        // --- Step A: Find the user's current holding of this specific stock ---
        const holding = await HoldingsModel.findOne({ name: name, userId: userId });

        // --- Step B: Perform Critical Validation Checks ---
        if (!holding) {
            return res.status(404).json({ message: "Sell failed. You do not own this stock." });
        }
        if (qty > holding.qty) {
            return res.status(400).json({ message: `Sell failed. Insufficient quantity. You only own ${holding.qty} shares.` });
        }

        // --- Step C: Update or Delete the Holding ---
        // Subtract the sold quantity from the user's holding
        holding.qty -= qty;

        if (holding.qty === 0) {
            // If the user has sold all their shares, remove the holding entirely
            await HoldingsModel.deleteOne({ _id: holding._id });
        } else {
            // Otherwise, just save the new, lower quantity
            await holding.save();
        }

        // --- Step D: Create a Transaction Record in the Orders Collection ---
        // We use the holding's average price for this record, as LTP might fluctuate
        const newOrder = new OrdersModel({
            name: name,
            qty: qty,
            price: holding.avg, // Use the average price for the order record
            mode: "SELL",
            userId: userId,
        });
        await newOrder.save();

        res.status(201).json({ message: `Successfully sold ${qty} shares of ${name}.` });

    } catch (error) {
        console.error("Sell order processing failed:", error);
        res.status(500).json({ message: "An error occurred on the server during the sell transaction." });
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