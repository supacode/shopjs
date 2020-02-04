const crypto = require('crypto');

const bcrypt = require('bcryptjs');

const { validationResult } = require('express-validator');

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  let errorMsg = req.flash('error');

  if (errorMsg.length > 0) {
    errorMsg = errorMsg[0];
  } else {
    errorMsg = null;
  }

  res.render('auth/login', {
    activeLink: '/login',
    pageTitle: 'Login',
    errorMsg,
    validationErrors: [],
    oldValues: {
      email: '',
      password: ''
    }
  });
};

exports.getSignup = (req, res, next) => {
  let errorMsg = req.flash('error');
  if (errorMsg.length > 0) {
    errorMsg = errorMsg[0];
  } else {
    errorMsg = null;
  }

  res.render('auth/signup', {
    activeLink: '/signup',
    pageTitle: 'Signup',
    errorMsg,
    oldValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationErrors: []
  });
};

exports.postSignup = async (req, res, next) => {
  const { email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('auth/signup', {
      activeLink: '/signup',
      pageTitle: 'Signup',
      errorMsg: errors.array()[0].msg,
      oldValues: {
        email,
        password,
        confirmPassword: req.body.confirmPassword
      },
      validationErrors: errors.array()
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = new User({
    email,
    password: hashedPassword
  });

  await user.save();
  res.redirect('/login');
};

exports.getResetPassword = (req, res, next) => {
  let errorMsg = req.flash('error');
  errorMsg.length ? (errorMsg = errorMsg[0]) : (errorMsg = null);

  res.render('auth/reset-password', {
    activeLink: '/login',
    pageTitle: 'Reset Password',
    errorMsg
  });
};

exports.postResetPassword = (req, res, next) => {
  const email = req.body.email.trim();

  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect('/reset-password');
    }

    const token = buffer.toString('hex');

    User.findOne({
      email
    })
      .then(user => {
        if (!user) {
          req.flash('error', 'No user found with the E-mail you entered.');
          return res.redirect('/reset-password');
        }
        user.resetToken = token;
        user.resetTokenExpiry = Date.now() + 7200000;
        return user.save();
      })
      .then(result => {
        console.log(result);
        // SEND RESET EMAIL
      })
      .catch(err => console.log(err));
  });
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('auth/login', {
      activeLink: '/login',
      pageTitle: 'Login',
      errorMsg: errors.array()[0].msg,
      validationErrors: errors.array(),
      oldValues: {
        email,
        password
      }
    });
  }

  User.findOne({
    email
  })
    .then(user => {
      if (!user) {
        return res.status(422).render('auth/login', {
          activeLink: '/login',
          pageTitle: 'Login',
          errorMsg: errors.array()[0].msg,
          validationErrors: errors.array(),
          oldValues: {
            email,
            password
          }
        });
      }

      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/');
            });
          }

          res.status(422).render('auth/login', {
            activeLink: '/login',
            pageTitle: 'Login',
            errorMsg: 'Invalid E-mail/Password combination.',
            validationErrors: [],
            oldValues: {
              email,
              password
            }
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

exports.getNewPassword = (req, res, next) => {
  const { token } = req.params;

  User.findOne({
    resetToken: token,
    resetTokenExpiry: {
      $gt: Date.now()
    }
  })
    .then(user => {
      if (!user) {
        return res.redirect('/');
      }
      res.render('auth/new-password', {
        pageTitle: 'New Passowrd',
        activeLink: '/login',
        user: user._id.toString(),
        token
      });
    })
    .catch(err => console.log(err));
};

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.newPassword;
  const passwordToken = req.body.token;
  const userId = req.body.user;
  let resetUser;
  User.findOne({
    _id: userId,
    resetTokenExpiry: {
      $gt: Date.now()
    },
    resetToken: {
      $eq: passwordToken
    }
  })
    .then(user => {
      if (!user) {
        return res.redirect('back');
      }
      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then(hashedPassword => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiry = undefined;
      return resetUser.save();
    })
    .then(result => {
      res.redirect('/login');
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
