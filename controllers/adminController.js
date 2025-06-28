import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Order from '../models/orderModel.js';

/*===============================================
=               ADMIN STATUS CHECK              =
===============================================*/

// @desc    Check if logged-in user is admin
// @route   GET /api/admin/status
export const checkAdminStatus = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');

  if (!user || !user.role.includes('admin')) {
    res.status(403);
    throw new Error('Access denied: Admins only');
  }

  res.status(200).json({
    isAdmin: true,
    name: user.name,
    email: user.email,
    role: user.role,
  });
});

/*===============================================
=           USER & SELLER MANAGEMENT            =
===============================================*/

// @desc    Get all users
// @route   GET /api/admin/users
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.status(200).json(users);
});

// @desc    Get all sellers
// @route   GET /api/admin/sellers
export const getAllSellers = asyncHandler(async (req, res) => {
  const sellers = await User.find({ role: { $in: ['seller'] } }).select('-password');
  res.status(200).json(sellers);
});

// @desc    Update user or seller info
// @route   PUT /api/admin/users/:id
export const updateUserByAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.name = req.body.name ?? user.name;
  user.email = req.body.email ?? user.email;
  user.phone = req.body.phone ?? user.phone;
  user.role = req.body.role ?? user.role;

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    phone: updatedUser.phone,
    role: updatedUser.role,
  });
});

// @desc    Delete a user or seller account
// @route   DELETE /api/admin/users/:id
export const deleteUserByAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  await user.deleteOne();
  res.status(200).json({ message: 'User account deleted successfully' });
});

/*===============================================
=                 ORDER MANAGEMENT              =
===============================================*/

// @desc    Get all orders placed in system
// @route   GET /api/admin/orders
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate('user_id', 'name email')
    .populate('seller_id', 'name email')
    .populate('items.product_id', 'product_name');

  res.status(200).json(orders);
});
