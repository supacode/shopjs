const express = require('express');

const router = express.Router();

const validator = require('../validators/auth');

const authController = require('../controllers/auth');

router
  .route('/login')
  .get(authController.getLogin)
  .post(validator.login, authController.postLogin);

router.post('/logout', authController.postLogout);

router
  .route('/signup')
  .get(authController.getSignup)
  .post(validator.signUp, authController.postSignup);

router
  .route('/reset-password')
  .get(authController.getResetPassword)
  .post(authController.postResetPassword);

router.get('/reset-password/:token', authController.getNewPassword);

router.post('/new-password/', authController.postNewPassword);

module.exports = router;
