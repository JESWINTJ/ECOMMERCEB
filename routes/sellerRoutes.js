import express from 'express';
import {
  registerSeller,
  checkSeller,
  viewSellerProfile,
  getSellerProducts,
  addNewProduct,
  updateProduct,
  getSellerOrders
} from '../controllers/sellerController.js';

import { authenticateUser as protect } from '../middleware/authentication.js';

const router = express.Router();

// Public
router.post('/register', registerSeller);

// Protected (Seller only routes)
router.get('/check', protect, checkSeller);
router.get('/profile', protect, viewSellerProfile);
router.get('/products', protect, getSellerProducts);
router.post('/products', protect, addNewProduct);
router.put('/products/:id', protect, updateProduct);
router.get('/orders', protect, getSellerOrders);

export default router;
