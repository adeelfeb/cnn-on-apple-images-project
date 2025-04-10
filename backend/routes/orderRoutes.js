import express from 'express';
import { 
  createOrder,
  getSellerOrders 
} from '../controllers/orderController.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/seller/:sellerName', getSellerOrders);

export default router;