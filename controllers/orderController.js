import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

/* ========================
   MAKE ORDER
   POST /api/orders
   ======================== */
export const makeOrder = asyncHandler(async (req, res) => {
  const { items, shippingAddress } = req.body;

  if (!items || items.length === 0) {
    res.status(400);
    throw new Error('No order items provided');
  }

  let totalAmount = 0;
  const createdOrders = [];

  for (const item of items) {
    const product = await Product.findById(item.product_id);
    if (!product || !product.is_active) {
      res.status(404);
      throw new Error(`Product not found or inactive: ${item.product_id}`);
    }

    if (product.quantity < item.quantity) {
      res.status(400);
      throw new Error(`Insufficient stock for: ${product.product_name}`);
    }

    product.quantity -= item.quantity;
    await product.save();

    const order = new Order({
      user_id: req.user._id,
      seller_id: product.seller_id,
      items: [{
        product_id: product._id,
        quantity: item.quantity,
        price: product.price
      }],
      total_amount: product.price * item.quantity,
      shippingAddress,
    });

    await order.save();
    totalAmount += order.total_amount;
    createdOrders.push(order);
  }

  res.status(201).json({
    message: 'Order placed successfully',
    totalAmount,
    orders: createdOrders,
  });
});


/* ========================
   GET BUYER'S ORDERS
   GET /api/orders/my
   ======================== */
export const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user_id: req.user._id }).sort({ created_at: -1 });
  res.status(200).json(orders);
});


/* ========================
   GET SELLER'S ORDERS
   GET /api/orders/seller
   ======================== */
export const getSellerOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ seller_id: req.user._id }).sort({ created_at: -1 });
  res.status(200).json(orders);
});


/* ========================
   UPDATE ORDER STATUS
   PUT /api/orders/:id/status
   ======================== */
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const validStatuses = ['shipped', 'delivered'];

  if (!validStatuses.includes(status)) {
    res.status(400);
    throw new Error('Invalid status');
  }

  const order = await Order.findById(req.params.id);

  if (!order || order.seller_id.toString() !== req.user._id.toString()) {
    res.status(404);
    throw new Error('Order not found or unauthorized');
  }

  order.status = status;
  await order.save();

  res.status(200).json({ message: `Order marked as ${status}` });
});
