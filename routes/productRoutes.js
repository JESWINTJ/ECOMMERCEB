import express from 'express';
import {
  getAllProducts,
  getProductById,
  addNewProduct,
  updateProduct,
  removeProduct
} from '../controllers/productController.js';

import { protect, sellerOnly } from '../middleware/authentication.js';


const router = express.Router();

/*============================================
=              Public Routes                 =
============================================*/
// @route   GET /api/products/
router.get('/', getAllProducts);

// @route   GET /api/products/:id
router.get('/:id', getProductById);

/*============================================
=       Seller Product Management Routes     =
============================================*/
// @route   POST /api/products/
router.post(
  '/',
  protect,
  sellerOnly,
  addNewProduct
);

// @route   PUT /api/products/:id
router.put(
  '/:id',
  protect,
  sellerOnly,
  updateProduct
);

// @route   DELETE /api/products/:id
router.delete('/:id', protect, sellerOnly, removeProduct);

export default router;
