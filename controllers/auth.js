const User = require('../models/user');
exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        activeLink: '/login',
        pageTitle: 'Login',
        isAuth: false
    });
}

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        activeLink: '/signup',
        pageTitle: 'Signup',
        isAuth: false
    });
}

exports.postSignup = (req, res, next) => {

    console.log(req.body);
    res.redirect('back');

}


exports.postLogin = (req, res, next) => {

    User.findById()
        .then(user => {
            req.session.isLoggedIn = true;
            req.session.user = user;
            req.session.save(err => {
                console.log(err);
                res.redirect('/');
            });
        })
        .catch(err => console.log(err));


}

exports.postLogout = (req, res, next) => {

    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });

}