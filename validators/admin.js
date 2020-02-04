const { body } = require('express-validator');

exports.product = [
  body('name')
    .trim()
    .isLength({
      min: 5
    })
    .withMessage('Product name is required'),
  body('price')
    .trim()
    .isFloat()
    .withMessage('Price must be a number.'),
  body('description')
    .trim()
    .isLength({
      min: 5,
      max: 400
    })
    .withMessage('Product description must be more than 5 characters.')
];
