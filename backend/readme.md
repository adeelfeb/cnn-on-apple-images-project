I'll help you organize the code by creating separate route and controller files for each feature (auth, products, orders, auctions). Here's the structured version:

### 1. First, let's create the route files:

#### `routes/authRoutes.js`
```javascript
import express from 'express';
import { signup, login } from '../controllers/authController.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/signup', upload.single('image'), signup);
router.post('/login', login);

export default router;
```

#### `routes/productRoutes.js`
```javascript
import express from 'express';
import { 
  addProduct,
  getSellerProducts,
  getAllProducts,
  getProductDetails,
  updateProduct 
} from '../controllers/productController.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/', upload.fields([{ name: 'productImage', maxCount: 1 }]), addProduct);
router.get('/seller/:sellerName', getSellerProducts);
router.get('/', getAllProducts);
router.get('/:id', getProductDetails);
router.put('/:id', updateProduct);

export default router;
```

#### `routes/orderRoutes.js`
```javascript
import express from 'express';
import { 
  createOrder,
  getSellerOrders 
} from '../controllers/orderController.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/seller/:sellerName', getSellerOrders);

export default router;
```

#### `routes/auctionRoutes.js`
```javascript
import express from 'express';
import { 
  createAuction,
  getActiveAuctions,
  placeBid,
  getSellerAuctions 
} from '../controllers/auctionController.js';

const router = express.Router();

router.post('/', createAuction);
router.get('/', getActiveAuctions);
router.post('/:auctionId/bid', placeBid);
router.get('/seller/:sellerId', getSellerAuctions);

export default router;
```

### 2. Now, let's create the controller files:

#### `controllers/authController.js`
```javascript
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  const { name, password, city, phone, role } = req.body;

  if (!name || !password || !city || !phone || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

  try {
    const newUser = new User({
      name,
      password,
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
};

export const login = async (req, res) => {
  const { name, password, role } = req.body;

  if (!name || !password || !role) {
    return res.status(400).json({ message: 'Name, password, and role are required' });
  }

  try {
    const user = await User.findOne({ name, role });

    if (!user) {
      return res.status(400).json({ message: 'User not found with provided name and role' });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: { name: user.name, image: user.image, role: user.role },
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};
```

#### `controllers/productController.js`
```javascript
import SellerProduct from '../models/SellerProduct.js';
import axios from 'axios';

export const addProduct = async (req, res) => {
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
};

export const getSellerProducts = async (req, res) => {
  const { sellerName } = req.params;

  try {
    const products = await SellerProduct.find({ sellerName });
    res.status(200).json({ products });
  } catch (error) {
    console.error('Error fetching seller products:', error);
    res.status(500).json({ message: 'Error fetching seller products', error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await SellerProduct.find();
    res.status(200).json({ products });
  } catch (error) {
    console.error('Error fetching all products:', error);
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

export const getProductDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await SellerProduct.findById(id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const relatedProducts = await SellerProduct.find({
      productName: { $regex: product.productName, $options: 'i' },
    }).limit(5);

    res.status(200).json({
      product,
      relatedProducts,
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { productName, price, description, quantity } = req.body;

  try {
    const updatedProduct = await SellerProduct.findByIdAndUpdate(
      id,
      { productName, price, description, quantity },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.status(200).json({ message: 'Product updated successfully.', product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product.' });
  }
};
```

#### `controllers/orderController.js`
```javascript
import Order from '../models/Order.js';
import SellerProduct from '../models/SellerProduct.js';

export const createOrder = async (req, res) => {
  const { productId, buyerName, buyerPhone, buyerAddress, quantity } = req.body;

  try {
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

    await newOrder.save();
    product.quantity -= quantity;
    await product.save();

    res.status(201).json({ message: 'Order placed successfully!', order: newOrder });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Error placing order', error: error.message });
  }
};

export const getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ sellerName: req.params.sellerName });
    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this seller.' });
    }
    res.json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders.' });
  }
};
```

#### `controllers/auctionController.js`
```javascript
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
```

### 3. Create middleware files:

#### `middleware/uploadMiddleware.js`
```javascript
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

export default upload;
```

#### `middleware/authMiddleware.js`
```javascript
import jwt from 'jsonwebtoken';

export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, 'your_secret_key', (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    return res.sendStatus(401);
  }
};
```

### 4. Update your main server file (index.js or server.js):

```javascript
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import auctionRoutes from './routes/auctionRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import productRoutes from './routes/productRoutes.js';
import { connectDB } from './config/db.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/auctions', auctionRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 5. Create a config file for database connection:

#### `config/db.js`
```javascript
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://junaidashrafjd:3M4GUKYccdbNsZ7o@cluster0.ssfpj.mongodb.net/', 
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error: ", error);
    process.exit(1);
  }
};
```

This structure provides a clean separation of concerns:
- Routes handle HTTP requests and route them to the appropriate controller
- Controllers contain the business logic
- Middleware handles cross-cutting concerns like authentication and file uploads
- Models define the data structure
- Config contains configuration settings

You'll need to make sure you have all the necessary model files (User.js, SellerProduct.js, Order.js, Auction.js, Bid.js) in your `models` directory. The structure follows best practices for Express.js applications and makes the code more maintainable and scalable.