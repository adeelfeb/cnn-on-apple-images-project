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