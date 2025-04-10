import mongoose from 'mongoose';

const SellerProductSchema = new mongoose.Schema({
  sellerName: { type: String, required: true },
  productName: { type: String, required: true },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  productImage: { type: String },
  quantity: { type: Number, required: true },
});

const SellerProduct = mongoose.model('SellerProduct', SellerProductSchema);
export default SellerProduct;