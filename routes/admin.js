const express = require('express');

const router = express.Router();

const pagesController = require('../controllers/products');

router.get('/', pagesController.getProducts );

module.exports = router;