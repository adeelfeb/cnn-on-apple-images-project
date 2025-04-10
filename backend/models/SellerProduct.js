const mongoose = require('mongoose');

const SellerProductSchema = new mongoose.Schema({
  sellerName: { type: String, required: true },
  productName: { type: String, required: true },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  productImage: { type: String },
  quantity: { type: Number, required: true },  // Added the quantity field
});

const SellerProduct = mongoose.model('SellerProduct', SellerProductSchema);

module.exports = SellerProduct;
