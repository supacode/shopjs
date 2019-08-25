const express = require('express');

const router = express.Router();

const validator = require('../middleware/validator');

const {
    check,
    body
} = require('express-validator');

const User = require('../models/user');

const authController = require('../controllers/auth');

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.post('/logout', authController.postLogout);


// Signup Routes
router.get('/signup', authController.getSignup);

router.post('/signup',
    check('email').isEmail().withMessage('Enter a valid E-mail')
    .custom((value, {
        req
    }) => {
        return User.findOne({
            email: value
        }).then(userDoc => {
            if (userDoc) {
                console.log(userDoc);
                return Promise.reject(
                    'E-Mail  already exists, use a different one.'
                );
            }
        });
    }),
    body('password').isLength({
        min: 6
    }).withMessage('Password must be more than 5 characters'),
    body('confirmPassword').custom((value, {
        req
    }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    }), authController.postSignup);

router.get('/reset-password', authController.getResetPassword);

router.post('/reset-password', authController.postResetPassword);

router.get('/reset-password/:token', authController.getNewPassword);

router.post('/new-password/', authController.postNewPassword);

module.exports = router;