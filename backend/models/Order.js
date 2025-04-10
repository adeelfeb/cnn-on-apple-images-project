const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  sellerName: { type: String, required: true },
  buyerName: { type: String, required: true },
  buyerPhone: { type: String, required: true },
  buyerAddress: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  totalPrice: { type: Number, required: true },  // Calculated total price
  status: { type: String, default: 'Pending' },  // Order status
}, {
  timestamps: true, // Will add createdAt and updatedAt fields
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
