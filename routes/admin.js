const express = require('express');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/auth');
const validator = require('../validators/admin');

const router = express.Router();

router.use(isAuth);

router
  .route('/add-product')
  .get(adminController.getAddProduct)
  .post(validator.product, adminController.postAddProduct);

router.get('/products', adminController.getProducts);

router.get('/edit-product/:id', isAuth, adminController.getEditProduct);

router.post(
  '/edit-product',
  validator.product,
  adminController.postEditProduct
);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
