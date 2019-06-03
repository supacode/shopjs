const express = require('express');

const router = express.Router();

const adminController = require('../controllers/adminController');

router.get('/add-product', adminController.getAddProduct );

module.exports = router;