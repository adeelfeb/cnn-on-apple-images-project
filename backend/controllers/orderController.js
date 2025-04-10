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