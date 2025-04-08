import express from 'express';
import { placeOrder, getUserOrders, getAllOrders } from '../controllers/orderController.js';
import { verifyToken, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, placeOrder);
router.get('/my', verifyToken, getUserOrders);
router.get('/', verifyToken, isAdmin, getAllOrders);

export default router;
