const express = require('express');
const router = express.Router();
const orderController = require('./orderController');

router.get('/my-orders', orderController.getAllOrders);
router.get('/orders/:orderId', orderController.getOrderById);
router.put('/orders/:orderId', orderController.updateOrder);
router.post('/my-orders', orderController.createOrder);
router.delete('/my-orders/:orderId', orderController.deleteOrder);


module.exports = router;
