const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, orderController.createOrder);
router.get('/myorders', authMiddleware, orderController.getUserOrders);
router.get('/:orderId', orderController.getOrderById);

module.exports = router;
