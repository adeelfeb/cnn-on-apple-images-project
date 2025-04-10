import express from 'express';
import { signup, login } from '../controllers/authController.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Signup Route
router.post('/signup', upload.single('image'), signup);

// Login Route
router.post('/login', login);

export default router;

