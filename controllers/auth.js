const crypto = require('crypto');

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

    res.render('auth/reset-password', {
        activeLink: '/login',
        pageTitle: 'Reset Password'
    });

}


exports.postResetPassword = (req, res, next) => {

    const email = req.body.email;
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
            return res.redirect('/reset-password');
        }

        const token = buffer.toString('hex');

        User.findOne({
                email
            }).then(user => {
                if (!user) {
                    // REDIRECT BACK WITH ERROR MESSAGE
                    return res.redirect('/reset-password');
                }
                user.resetToken = token;
                user.resetTokenExpiry = Date.now() + 7200000;
                return user.save()

            })
            .then(result => {
                res.redirect('back');
                // SEND RESET EMAIL 
            })
            .catch(err => console.log(err));


    });


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


exports.getNewPassword = (req, res, next) => {

    const token = req.params.token;

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
                user: user._id.toString()
            });
        })
        .catch(err => console.log(err));




}
exports.postNewPassword = (req, res, next) => {

    console.log(req.body);
    res.redirect('back');

}


exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });

}