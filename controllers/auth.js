const User = require('../models/user');
exports.getLogin = (req, res, next) => {
    console.log(req.session);
    res.render('auth/login', {
        activeLink: '/login',
        pageTitle: 'Login',
        isAuth: req.isAuth
    });
}

exports.postLogin = (req, res, next) => {

    User.findOne()
        .then(user => {
            req.session.isLoggedIn = true;
            req.session.user = user;
            res.redirect('/');
        })
        .catch(err => console.log(err));


}

exports.postLogout = (req, res, next) => {

    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });


}