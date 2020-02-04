const { check, body } = require('express-validator');

const User = require('../models/user');

const USER_PASSWORD_MIN_LENGTH = process.env.USER_PASSWORD_MIN;

exports.signUp = [
  check('email')
    .isEmail()
    .withMessage('Enter a valid E-mail')
    .custom((value, { req }) => {
      return User.findOne({
        email: value
      }).then(userDoc => {
        if (userDoc) {
          throw new Error('Passwords have to match!');
        }
      });
    }),
  body('password')
    .isLength({
      min: USER_PASSWORD_MIN_LENGTH
    })
    .withMessage('Password must be more than 5 characters'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords have to match!');
    }
    return true;
  })
];

exports.login = [
  check('email')
    .isEmail()
    .withMessage('Enter a valid E-mail'),
  check('password')
    .isLength({
      min: USER_PASSWORD_MIN_LENGTH
    })
    .withMessage('Password has to be valid.')
];
