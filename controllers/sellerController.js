import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';

/*===============================================
=          1. Register New Seller               =
===============================================*/
export const registerSeller = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    phone,
    password,
    confirmPassword,
    gstNumber,
    address, // Object with address info
  } = req.body;

  if (
    !name || !email || !phone || !password ||
    !confirmPassword || !gstNumber || !address
  ) {
    res.status(400);
    throw new Error('All required fields must be filled');
  }

  if (password !== confirmPassword) {
    res.status(400);
    throw new Error('Passwords do not match');
  }

  const userExists = await User.findOne({ $or: [{ email }, { phone }] });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists with given email or phone');
  }

  const user = await User.create({
    name,
    email,
    phone,
    password,
    role: ['buyer', 'seller'],
    sellerProfile: {
      gstNumber,
      address,
      isVerified: false
    }
  });

  res.status(201).json({
    message: 'Seller account created',
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      sellerProfile: user.sellerProfile
    }
  });
});

/*===============================================
=          2. Check Seller Status               =
===============================================*/
export const checkSeller = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');

  if (!user || !user.role.includes('seller')) {
    res.status(403);
    throw new Error("User is not a seller");
  }

  res.status(200).json({
    isSeller: true,
    isVerified: user.sellerProfile?.isVerified || false,
    gstNumber: user.sellerProfile?.gstNumber || null
  });
});

/*===============================================
=          3. View Seller Profile               =
===============================================*/
export const viewSellerProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');

  if (!user || !user.role.includes('seller')) {
    res.status(403);
    throw new Error("Access denied");
  }

  const { gstNumber, address, isVerified } = user.sellerProfile || {};
  res.status(200).json({ gstNumber, address, isVerified });
});

/*===============================================
=          4. Get Seller Products               =
===============================================*/
export const getSellerProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ seller_id: req.user._id });
  res.status(200).json(products);
});

/*===============================================
=          5. Add New Product                   =
===============================================*/
export const addNewProduct = asyncHandler(async (req, res) => {
  const {
    product_name,
    description,
    category,
    price,
    quantity
  } = req.body;

  if (!product_name || !description || !category || !price || !quantity || !product_image) {
    res.status(400);
    throw new Error("All product fields are required");
  }

  const product = await Product.create({
    seller_id: req.user._id,
    product_name,
    description,
    category,
    price,
    quantity,
    product_image,
  });

  res.status(201).json({ message: "Product added", product });
});

/*===============================================
=          6. Update Product                    =
===============================================*/
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    _id: req.params.id,
    seller_id: req.user._id
  });

  if (!product) {
    res.status(404);
    throw new Error("Product not found or not authorized");
  }

  const fields = ['product_name', 'description', 'category', 'price', 'quantity', 'product_image'];
  fields.forEach(field => {
    if (req.body[field]) product[field] = req.body[field];
  });

  const updated = await product.save();
  res.status(200).json({ message: "Product updated", product: updated });
});

/*===============================================
=          7. Get Seller Orders                 =
===============================================*/
export const getSellerOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ seller_id: req.user._id })
    .populate('user_id', 'name email')
    .populate('items.product_id', 'product_name');

  res.status(200).json(orders);
});
