

const mongoose = require("mongoose");

// Updated Auction Schema
const auctionSchema = new mongoose.Schema({
  productId: String,
  startTime: Date,
  endTime: Date,
  price: Number,
  quantity: Number,
  location: String,
  phoneNumber: String,
  link: String,
  bids: [
    {
      name: String,
      phone: String,
      location: String,
      maxBid: Number,
      bidTime: { type: Date, default: Date.now }
    }
  ]
});

const Auction = mongoose.model("Auction", auctionSchema);

module.exports = Auction;

