import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  sellerName: { type: String, required: true },
  buyerName: { type: String, required: true },
  buyerPhone: { type: String, required: true },
  buyerAddress: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
}, {
  timestamps: true,
});

const Order = mongoose.model('Order', OrderSchema);
export default Order;