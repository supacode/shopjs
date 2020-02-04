const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

const isAuth = require('../middleware/auth');

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:id', shopController.getProduct);

router.use(isAuth);

router
  .route('/cart')
  .get(shopController.getCart)
  .post(shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.post('/create-order', shopController.postOrder);

router.get('/orders', shopController.getOrders);

router.get('/orders/:orderId', shopController.getReceipt);

module.exports = router;
