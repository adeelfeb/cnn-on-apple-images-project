import Auction from '../models/Auction.js';

export const createAuction = async (req, res) => {
  try {
    const { productId, startTime, endTime, price, quantity, location, phoneNumber, link } = req.body;

    const newAuction = new Auction({
      productId,
      startTime,
      endTime,
      price,
      quantity,
      location,
      phoneNumber,
      link,
      bids: [],
    });

    await newAuction.save();
    res.status(201).json({ message: "Auction created successfully", auction: newAuction });
  } catch (error) {
    res.status(500).json({ message: "Error creating auction", error: error.message });
  }
};

export const getActiveAuctions = async (req, res) => {
  try {
    const currentTime = new Date();
    const auctions = await Auction.find();
    res.json(auctions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching auctions", error: error.message });
  }
};

export const placeBid = async (req, res) => {
  try {
    const { auctionId } = req.params;
    const { name, phone, location, maxBid } = req.body;

    const auction = await Auction.findById(auctionId);
    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    auction.bids.push({ name, phone, location, maxBid, bidTime: new Date() });
    await auction.save();
    
    res.status(201).json({ message: "Bid placed successfully", auction });
  } catch (error) {
    res.status(500).json({ message: "Error placing bid", error: error.message });
  }
};

export const getSellerAuctions = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const auctions = await Auction.find({ sellerId }).populate("bids");
    res.json(auctions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};