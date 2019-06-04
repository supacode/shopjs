const express = require('express');

const router = express.Router();

const products = require('../controllers/products');

router.get('/add-product', products.getAddProduct );
router.post('/add-product', products.postAddProduct );


module.exports = router;