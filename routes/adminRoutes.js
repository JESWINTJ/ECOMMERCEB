import express from 'express';
import {
  checkAdminStatus,
  getAllUsers,
  getAllSellers,
  updateUserByAdmin,
  deleteUserByAdmin,
  getAllOrders,
} from '../controllers/adminController.js';

import { authenticateUser as protect } from '../middleware/authentication.js';
import { restrictToAdmin as adminOnly } from '../middleware/authentication.js';

const router = express.Router();

// Apply admin protection globally
router.use(protect, adminOnly);

/*===============================================
=              Admin Status Check              =
===============================================*/
// GET /api/admin/status
router.get('/status', checkAdminStatus);

/*===============================================
=              User Management                 =
===============================================*/
// GET /api/admin/users
router.get('/users', getAllUsers);

// PUT & DELETE /api/admin/users/:id
router
  .route('/users/:id')
  .put(updateUserByAdmin)
  .delete(deleteUserByAdmin);

/*===============================================
=              Seller Management               =
===============================================*/
// GET /api/admin/sellers
router.get('/sellers', getAllSellers);

/*===============================================
=              Order Management                =
===============================================*/
// GET /api/admin/orders
router.get('/orders', getAllOrders);

export default router;
