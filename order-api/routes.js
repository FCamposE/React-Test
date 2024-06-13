const express = require('express');
const router = express.Router();
const orderController = require('./orderController');
const productController = require('./productController');

router.get('/my-orders', orderController.getAllOrders);
router.get('/orders/:orderId', orderController.getOrderById);
router.put('/orders/:orderId', orderController.updateOrder);
router.post('/orders', orderController.createOrder);
router.delete('/my-orders/:orderId', orderController.deleteOrder);
router.delete('/orders/:orderId/products/:productId', orderController.deleteOrderProduct);

router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
