// backend/middleware/AuthMiddleware.js
const User = require("../models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ status: false, message: "No token provided" });
  }

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.status(401).json({ status: false, message: "Invalid token" });
    } else {
      const user = await User.findById(data.id);
      if (user) {
        req.userId = user._id; // Attach user's ID to the request
        next(); // Proceed to the actual route
      } else {
        return res.status(404).json({ status: false, message: "User not found" });
      }
    }
  });
};