const bcrypt = require('bcryptjs');

const User = require('../models/user');


exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        activeLink: '/login',
        pageTitle: 'Login'
    });
}

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        activeLink: '/signup',
        pageTitle: 'Signup'
    });
}

exports.getResetPassword = (req, res, next) => {

    res.render('auth/resetPassword', {
        activeLink: '/login',
        pageTitle: 'Reset Password'
    });

}


exports.postResetPassword = (req, res, next) => {



}


exports.postSignup = (req, res, next) => {

    const email = req.body.email.trim();
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    User.findOne({
            email
        })
        .then(userDoc => {

            if (userDoc) {
                return res.redirect('back');
            }

            return bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        email,
                        password: hashedPassword
                    });

                    return user.save();
                })
                .then(() => res.redirect('/login'))
        })
        .catch(err => console.log(err));

}

exports.postLogin = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({
            email: email
        })
        .then(user => {

            if (!user) {
                return res.redirect('/login');
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {

                    if (isMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/');
                        });

                    }
                    return res.redirect('/login');

                }).
            catch(err => console.log(err));




        })
        .catch(err => console.log(err));
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });

}