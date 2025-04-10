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