import express from 'express';
import {
  viewUserCart,
  addItemToCart,
  modifyCartItemQuantity,
  deleteCartItem,
  emptyCart,
} from '../controllers/cartController.js';
import { protect } from '../middleware/authentication.js';

const router = express.Router();



// Handle full cart operations: fetch, add, and clear
router
  .route('/')
  .get(protect, viewUserCart)          
  .post(protect, addItemToCart)        
  .delete(protect, emptyCart);          

// Handle operations for a specific product in cart
router
  .route('/:productId')
  .put(protect, modifyCartItemQuantity) 
  .delete(protect, deleteCartItem);     

export default router;
