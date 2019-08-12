exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        activeLink: '/login',
        pageTitle: 'Login',
    });
}