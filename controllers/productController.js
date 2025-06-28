import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

/*=============================================
=               GET ALL PRODUCTS              =
=============================================*/
// @route   GET /api/products
export const getAllProducts = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;
  const keyword = req.query.search
    ? { product_name: { $regex: req.query.search, $options: 'i' } }
    : {};

  const filter = {
    ...keyword,
    is_active: true,
  };

  const count = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .skip(pageSize * (page - 1))
    .limit(pageSize);

  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
    total: count,
  });
});

/*=============================================
=             GET PRODUCT BY ID               =
=============================================*/
// @route   GET /api/products/:id
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.json(product);
});

/*=============================================
=               ADD NEW PRODUCT               =
=============================================*/
// @route   POST /api/products
export const addNewProduct = asyncHandler(async (req, res) => {
  const {
    product_name,
    description,
    category,
    price,
    quantity
  } = req.body;

  const imageUrls = req.files?.map(file => file.path) || [];

  const product = new Product({
    seller_id: req.user._id,
    product_name,
    description,
    category,
    price,
    quantity,
    product_image: imageUrls,
  });

  const created = await product.save();
  res.status(201).json(created);
});

/*=============================================
=               UPDATE PRODUCT                =
=============================================*/
// @route   PUT /api/products/:id
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  if (product.seller_id.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this product');
  }

  product.product_name = req.body.product_name || product.product_name;
  product.description = req.body.description || product.description;
  product.category = req.body.category || product.category;
  product.price = req.body.price || product.price;
  product.quantity = req.body.quantity || product.quantity;

  if (req.files && req.files.length > 0) {
    product.product_image = req.files.map(file => file.path);
  }

  const updated = await product.save();
  res.json(updated);
});

/*=============================================
=               REMOVE PRODUCT                =
=============================================*/
// @route   DELETE /api/products/:id
export const removeProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  if (product.seller_id.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to delete this product');
  }

  await product.deleteOne();
  res.json({ message: 'Product deleted successfully' });
});
