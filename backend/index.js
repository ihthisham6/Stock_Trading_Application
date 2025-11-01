// require('dotenv').config();

// const express = require('express');
// const mongoose = require('mongoose');

// const bodyParser = require('body-parser');
// const cors = require('cors');
// const cookieParser = require("cookie-parser");
// const authRoute = require("./routes/AuthRoute");
// const { HoldingsModel } = require("./model/HoldingsModel");
// const { OrdersModel } = require("./model/OrdersModel");
// const { PositionsModel } = require("./model/PositionsModel");
// const PORT = process.env.PORT || 3002;

// const mongoURL = process.env.MONGO_URL;
// const app = express();


//   app.use(
//   cors({
//     origin: ["http://localhost:3000", "http://localhost:5173"], 
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true, // The most important part
// }));

// app.use("/", authRoute);
// app.use(bodyParser.json());

// app.use(cookieParser());

// // app.get('/addHoldings', async (req, res) => {
// //   let tempHoldings= [
// //   {
// //     name: "BHARTIARTL",
// //     qty: 2,
// //     avg: 538.05,
// //     price: 541.15,
// //     net: "+0.58%",
// //     day: "+2.99%",
// //   },
// //   {
// //     name: "HDFCBANK",
// //     qty: 2,
// //     avg: 1383.4,
// //     price: 1522.35,
// //     net: "+10.04%",
// //     day: "+0.11%",
// //   },
// //   {
// //     name: "HINDUNILVR",
// //     qty: 1,
// //     avg: 2335.85,
// //     price: 2417.4,
// //     net: "+3.49%",
// //     day: "+0.21%",
// //   },
// //   {
// //     name: "INFY",
// //     qty: 1,
// //     avg: 1350.5,
// //     price: 1555.45,
// //     net: "+15.18%",
// //     day: "-1.60%",
// //     isLoss: true,
// //   },
// //   {
// //     name: "ITC",
// //     qty: 5,
// //     avg: 202.0,
// //     price: 207.9,
// //     net: "+2.92%",
// //     day: "+0.80%",
// //   },
// //   {
// //     name: "KPITTECH",
// //     qty: 5,
// //     avg: 250.3,
// //     price: 266.45,
// //     net: "+6.45%",
// //     day: "+3.54%",
// //   },
// //   {
// //     name: "M&M",
// //     qty: 2,
// //     avg: 809.9,
// //     price: 779.8,
// //     net: "-3.72%",
// //     day: "-0.01%",
// //     isLoss: true,
// //   },
// //   {
// //     name: "RELIANCE",
// //     qty: 1,
// //     avg: 2193.7,
// //     price: 2112.4,
// //     net: "-3.71%",
// //     day: "+1.44%",
// //   },
// //   {
// //     name: "SBIN",
// //     qty: 4,
// //     avg: 324.35,
// //     price: 430.2,
// //     net: "+32.63%",
// //     day: "-0.34%",
// //     isLoss: true,
// //   },
// //   {
// //     name: "SGBMAY29",
// //     qty: 2,
// //     avg: 4727.0,
// //     price: 4719.0,
// //     net: "-0.17%",
// //     day: "+0.15%",
// //   },
// //   {
// //     name: "TATAPOWER",
// //     qty: 5,
// //     avg: 104.2,
// //     price: 124.15,
// //     net: "+19.15%",
// //     day: "-0.24%",
// //     isLoss: true,
// //   },
// //   {
// //     name: "TCS",
// //     qty: 1,
// //     avg: 3041.7,
// //     price: 3194.8,
// //     net: "+5.03%",
// //     day: "-0.25%",
// //     isLoss: true,
// //   },
// //   {
// //     name: "WIPRO",
// //     qty: 4,
// //     avg: 489.3,
// //     price: 577.75,
// //     net: "+18.08%",
// //     day: "+0.32%",
// //   },
// // ];

// // tempHoldings.forEach((item) => {
// //     let newHolding = new HoldingsModel({
// //       name: item.name,
// //       qty: item.qty,
// //       avg: item.avg,
// //       price: item.price,
// //       net: item.day,
// //       day: item.day,
// //     });

// //     newHolding.save();
// //   });
// //   res.send("Done!");
// // });


// // app.get("/addPositions", async (req, res) => {
// //   let tempPositions = [
// //     {
// //       product: "CNC",
// //       name: "EVEREADY",
// //       qty: 2,
// //       avg: 316.27,
// //       price: 312.35,
// //       net: "+0.58%",
// //       day: "-1.24%",
// //       isLoss: true,
// //     },
// //     {
// //       product: "CNC",
// //       name: "JUBLFOOD",
// //       qty: 1,
// //       avg: 3124.75,
// //       price: 3082.65,
// //       net: "+10.04%",
// //       day: "-1.35%",
// //       isLoss: true,
// //     },
// //   ];

// //   tempPositions.forEach((item) => {
// //     let newPosition = new PositionsModel({
// //       product: item.product,
// //       name: item.name,
// //       qty: item.qty,
// //       avg: item.avg,
// //       price: item.price,
// //       net: item.net,
// //       day: item.day,
// //       isLoss: item.isLoss,
// //     });

// //     newPosition.save();
// //   });
// //   res.send("Done!");
// // });


// app.get('/allHoldings', async (req, res) => {
//   let allHoldings = await HoldingsModel.find({});
//   res.json(allHoldings);
// });

// app.get('/allPositions', async (req, res) => {
//   let allPositions = await PositionsModel.find({});
//   res.json(allPositions);
// });


// app.post('/newOrder', async (req, res) => {

//     let newOrder = new OrdersModel({
//         name: req.body.name,
//     qty: req.body.qty,
//     price: req.body.price,
//     mode: req.body.mode,
//     });

//     newOrder.save();
//     res.send("Order saved!");
// });

// app.listen(PORT, () => {
// console.log('App started!');
// mongoose.connect(mongoURL);
// console.log('DB Connected');
// });



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

app.post('/newOrder', userVerification, async (req, res) => {
    let newOrder = new OrdersModel({
        name: req.body.name,
        qty: req.body.qty,
        price: req.body.price,
        mode: req.body.mode,
          userId: req.userId,

    });
    await newOrder.save(); // It's good practice to await this
    res.send("Order saved!");
});



// ====================================================================
// ==================== TEMPORARY MIGRATION ROUTE =====================
//              DELETE OR COMMENT OUT THIS ENTIRE BLOCK AFTER USE
// ====================================================================
// app.get('/migrateData', async (req, res) => {
//     try {
//         // !!! CRITICAL: PASTE THE USER ID YOU COPIED FROM ATLAS HERE !!!
//         const testUserId = '690624a48fffb318d2ab655b'; 

//         // Safety check to ensure the ID is valid before proceeding
//         if (!mongoose.Types.ObjectId.isValid(testUserId)) {
//             return res.status(400).json({ message: "Invalid User ID format. Please check the ID you pasted." });
//         }

//         console.log(`Starting migration for userId: ${testUserId}`);

//         // --- Update Holdings ---
//         // Find all holdings that DO NOT have a userId field and set it.
//         const holdingsResult = await HoldingsModel.updateMany(
//             { userId: { $exists: false } },
//             { $set: { userId: testUserId } }
//         );

//         // --- Update Positions ---
//         const positionsResult = await PositionsModel.updateMany(
//             { userId: { $exists: false } },
//             { $set: { userId: testUserId } }
//         );

//         // --- Update Orders ---
//         const ordersResult = await OrdersModel.updateMany(
//             { userId: { $exists: false } },
//             { $set: { userId: testUserId } }
//         );
        
//         console.log('Migration complete.');

//         // Send a confirmation response to the browser
//         res.status(200).json({
//             message: "Data migration successful!",
//             holdingsUpdated: holdingsResult.modifiedCount,
//             positionsUpdated: positionsResult.modifiedCount,
//             ordersUpdated: ordersResult.modifiedCount
//         });

//     } catch (error) {
//         console.error("Migration failed:", error);
//         res.status(500).json({ message: "An error occurred during migration.", error: error.message });
//     }
// });
// ====================================================================
// ================== END OF TEMPORARY MIGRATION ROUTE ================
// ====================================================================

// ====================================================================
// =========== TEMPORARY ROUTE TO FIX MISSING HOLDINGS userId =========
// ====================================================================
// app.get('/fixHoldings', userVerification, async (req, res) => {
//     // This route is protected by userVerification.
//     // It will only run if you are logged in, and it gives us the correct req.userId.

//     try {
//         console.log(`Starting to fix holdings for userId: ${req.userId}`);

//         // Find all holdings that DO NOT have a userId field and update them.
//         const holdingsFixResult = await HoldingsModel.updateMany(
//             { userId: { $exists: false } },
//             { $set: { userId: req.userId } }
//         );

//         console.log('Holdings fix complete.');

//         // Send a confirmation response.
//         res.status(200).json({
//             message: "Holdings userId fix successful!",
//             holdingsUpdated: holdingsFixResult.modifiedCount
//         });

//     } catch (error) {
//         console.error("Holdings fix failed:", error);
//         res.status(500).json({ message: "An error occurred during the fix." });
//     }
// });
// ====================================================================
// =================== END OF TEMPORARY FIX ROUTE =====================
// ====================================================================

// ====================================================================
// ============ TEMPORARY ROUTE - BRUTE FORCE HOLDINGS FIX ============
// ====================================================================
// app.get('/bruteForceFixHoldings', userVerification, async (req, res) => {
//     try {
//         const userIdToSet = req.userId;
//         console.log(`Starting BRUTE FORCE fix for userId: ${userIdToSet}`);

//         // Directly access the collection named 'holdings'
//         const holdingsCollection = mongoose.connection.collection('holdings');

//         // Build the update operation
//         const filter = { userId: { $exists: false } };
//         const updateDoc = {
//             $set: {
//                 userId: new mongoose.Types.ObjectId(userIdToSet) // Ensure it's a proper ObjectId
//             },
//         };

//         // Execute the update
//         const result = await holdingsCollection.updateMany(filter, updateDoc);

//         console.log('Brute force fix complete. Documents modified:', result.modifiedCount);

//         res.status(200).json({
//             message: "Brute force holdings fix attempted!",
//             holdingsUpdated: result.modifiedCount // Use the correct property from the result
//         });

//     } catch (error) {
//         console.error("Brute force fix failed:", error);
//         res.status(500).json({ message: "An error occurred during the brute force fix." });
//     }
// });
// ====================================================================
// =================== END OF BRUTE FORCE FIX ROUTE ===================
// ====================================================================

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