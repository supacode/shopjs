exports.getLogin = (req, res, next) => {
    console.log(req.session);
    res.render('auth/login', {
        activeLink: '/login',
        pageTitle: 'Login',
        isAuth: req.isAuth
    });
}

exports.postLogin = (req, res, next) => {

    req.session.isLoggedIn = true;

    res.redirect('/');

}