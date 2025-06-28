import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';


// @route   GET /api/cart
export const viewUserCart = asyncHandler(async (req, res) => {
  const currentUser = await User.findById(req.user._id).populate('cart.product');

  if (!currentUser) {
    res.status(404);
    throw new Error('Unable to locate user');
  }

  res.status(200).json(currentUser.cart);
});


// @route   POST /api/cart
export const addItemToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  const user = await User.findById(req.user._id);
  const product = await Product.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const itemAlreadyInCart = user.cart.find(
    (item) => item.product.toString() === productId
  );

  if (itemAlreadyInCart) {
    itemAlreadyInCart.quantity += Number(quantity);
  } else {
    user.cart.push({ product: productId, quantity });
  }

  await user.save();
  res.status(201).json({ message: 'Product added to cart', cart: user.cart });
});


// @route   PUT /api/cart/:productId
export const modifyCartItemQuantity = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity < 1) {
    res.status(400);
    throw new Error('Quantity must be a positive number');
  }

  const user = await User.findById(req.user._id);
  const cartItem = user.cart.find(
    (item) => item.product.toString() === productId
  );

  if (!cartItem) {
    res.status(404);
    throw new Error('Item not found in cart');
  }

  cartItem.quantity = quantity;
  await user.save();

  res.status(200).json({ message: 'Item quantity updated', cart: user.cart });
});


// @route   DELETE /api/cart/:productId
export const deleteCartItem = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const user = await User.findById(req.user._id);
  user.cart = user.cart.filter(
    (item) => item.product.toString() !== productId
  );

  await user.save();
  res.status(200).json({ message: 'Item removed', cart: user.cart });
});


// @route   DELETE /api/cart
export const emptyCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  user.cart = [];
  await user.save();

  res.status(200).json({ message: 'Your cart is now empty' });
});
