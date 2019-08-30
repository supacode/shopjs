const express = require('express');

const router = express.Router();

const validator = require('../validators/auth');

const authController = require('../controllers/auth');

router.get('/login', authController.getLogin);

router.post('/login', validator.login, authController.postLogin);

router.post('/logout', authController.postLogout);

router.get('/signup', authController.getSignup);

router.post('/signup', validator.signUp, authController.postSignup);

router.get('/reset-password', authController.getResetPassword);

router.post('/reset-password', authController.postResetPassword);

router.get('/reset-password/:token', authController.getNewPassword);

router.post('/new-password/', authController.postNewPassword);

module.exports = router;