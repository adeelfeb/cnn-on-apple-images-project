const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors'); 
const jwt = require('jsonwebtoken');
const axios = require('axios')

// const bcrypt = require('bcryptjs');
const User = require('./models/User');
const SellerProduct = require('./models/SellerProduct');
const Order = require('./models/Order');
const Auction = require('./models/Auction')
const Bid = require("./models/Bid");
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 5000;

// MongoDB Connection
mongoose.connect(
  'mongodb+srv://junaidashrafjd:3M4GUKYccdbNsZ7o@cluster0.ssfpj.mongodb.net/', 
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.error("MongoDB connection error: ", error));

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// const cors = require("cors");
// app.use(cors());

// Authentication Middleware (JWT - Define it HERE, before using it!)
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Bearer <token>

    jwt.verify(token, 'your_secret_key', (err, user) => { // Replace 'your_secret_key'
      if (err) {
        return res.sendStatus(403); // Or res.status(403).json({ error: "Invalid token" });
      }

      req.user = user; // Make user available in req.user
      next();
    });
  } else {
    return res.sendStatus(401); // Or res.status(401).json({ error: "No token provided" });
  }
};

// Multer for Image Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });



// Signup Route
app.post('/api/signup', upload.single('image'), async (req, res) => {
  const { name, password, city, phone, role } = req.body;

  if (!name || !password || !city || !phone || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

  try {
    const newUser = new User({
      name,
      password,  // Store the password as plain text
      city,
      phone,
      role,
      image: imageUrl,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user' });
  }
});




// Login Route
app.post('/api/login', async (req, res) => {
  const { name, password, role } = req.body;

  if (!name || !password || !role) {
    return res.status(400).json({ message: 'Name, password, and role are required' });
  }

  try {
    // Log the incoming request data for debugging
    console.log('Login attempt with:', { name, password, role });

    // Find the user by name and role
    const user = await User.findOne({ name, role });

    // If user is not found
    if (!user) {
      return res.status(400).json({ message: 'User not found with provided name and role' });
    }

    // Log the found user data (without the password)
    console.log('User found:', { name: user.name, role: user.role });

    // Compare passwords
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Return user details if login is successful
    res.status(200).json({
      message: 'Login successful',
      user: { name: user.name, image: user.image, role: user.role },
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});





app.post('/api/seller/product', upload.fields([
  { name: 'productImage', maxCount: 1 }
]), async (req, res) => {
  const { sellerName, productName, productId, price, description, quantity } = req.body;

  const productImage = req.files && req.files.productImage
    ? `/uploads/${req.files.productImage[0].filename}`
    : '';

    

  try {
    const newProduct = new SellerProduct({
      sellerName,
      productName,
      productId,
      price,
      description,
      productImage,
      quantity,
    });

    const savedProduct = await newProduct.save();

    const response = await axios.post('https://678e-35-234-168-113.ngrok-free.app/api/kaggle/send-image', savedProduct);


    res.status(201).json({ message: 'Product added successfully!', product: savedProduct });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Error adding product', error: error.message });
  }
});


// GET: Fetch all products for a specific seller
app.get('/api/seller/products/:sellerName', async (req, res) => {
  const { sellerName } = req.params;

  try {
    const products = await SellerProduct.find({ sellerName });
    res.status(200).json({ products });
  } catch (error) {
    console.error('Error fetching seller products:', error);
    res.status(500).json({ message: 'Error fetching seller products', error: error.message });
  }
});

// Get All Products
app.get('/api/products', async (req, res) => {
  try {
    const products = await SellerProduct.find(); // Fetch all products from the database
    res.status(200).json({ products });
  } catch (error) {
    console.error('Error fetching all products:', error);
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});


// Get product details by productId
app.get('/api/product/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await SellerProduct.findById(id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find relevant products based on product name (for related products)
    const relatedProducts = await SellerProduct.find({
      productName: { $regex: product.productName, $options: 'i' }, // Case-insensitive match
    }).limit(5); // Show only 5 related products

    res.status(200).json({
      product,
      relatedProducts,
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
});


app.post('/api/order', async (req, res) => {
  const { productId, buyerName, buyerPhone, buyerAddress, quantity } = req.body;

  try {
    // Find the product being ordered
    const product = await SellerProduct.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (quantity < 10) {
      return res.status(400).json({ message: 'Minimum quantity is 10 kg' });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({ message: 'Insufficient quantity available' });
    }

    // Create the order object
    const totalPrice = product.price * quantity;

    const newOrder = new Order({
      productName: product.productName,
      sellerName: product.sellerName,
      buyerName,
      buyerPhone,
      buyerAddress,
      quantity,
      price: product.price,
      totalPrice,
    });

    // Save the order in the database
    await newOrder.save();

    // Reduce the quantity of the product in stock
    product.quantity -= quantity;
    await product.save();

    res.status(201).json({ message: 'Order placed successfully!', order: newOrder });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Error placing order', error: error.message });
  }
});

// Fetch orders for a specific seller
app.get('/api/orders/seller/:sellerName', async (req, res) => {
  try {
    console.log('Fetching orders for:', req.params.sellerName);  // Log the seller name
    const orders = await Order.find({ sellerName: req.params.sellerName });
    console.log('Orders fetched:', orders);  // Log the fetched orders
    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this seller.' });
    }
    res.json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders.' });
  }
});


// Update product details by product ID
app.put('/api/seller/product/:id', async (req, res) => {
  const { id } = req.params; // Product ID from the URL
  const { productName, price, description, quantity } = req.body; // Data sent from the client

  try {
    // Find the product by ID and update it
    const updatedProduct = await SellerProduct.findByIdAndUpdate(
      id,
      { productName, price, description, quantity },
      { new: true } // Return the updated product
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.status(200).json({ message: 'Product updated successfully.', product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product.' });
  }
});





app.post("/api/auctions", async (req, res) => {
  console.log("Received POST request at /api/auctions");
  console.log("Request Body:", req.body);  // This should include the 'link' field

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
      link,  // Ensure 'link' is here
      bids: [],
    });

    await newAuction.save();
    console.log("Auction saved successfully:", newAuction);  // This should log the full auction with 'link'
    res.status(201).json({ message: "Auction created successfully", auction: newAuction });
  } catch (error) {
    console.log("Error creating auction:", error.message);
    res.status(500).json({ message: "Error creating auction", error: error.message });
  }
});


// Get active auctions (expired ones filtered out)
app.get("/api/auctions", async (req, res) => {
  try {
    const currentTime = new Date();
    const auctions = await Auction.find();
    res.json(auctions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching auctions", error: error.message });
  }
});

// Place a bid on an auction
app.post("/api/auctions/:auctionId/bid", async (req, res) => {
  try {
    const { auctionId } = req.params;
    const { name, phone, location, maxBid } = req.body;

    const auction = await Auction.findById(auctionId);
    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    // Add bid to auction
    auction.bids.push({ name, phone, location, maxBid, bidTime: new Date() });

    await auction.save();
    res.status(201).json({ message: "Bid placed successfully", auction });
  } catch (error) {
    res.status(500).json({ message: "Error placing bid", error: error.message });
  }
});




app.get("/seller-auctions/:sellerId", async (req, res) => {
  try {
    const { sellerId } = req.params;
    const auctions = await Auction.find({ sellerId }).populate("bids");
    res.json(auctions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});



// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



