exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        activeLink: '/login',
        pageTitle: 'Login',
        isAuth
    });
}

exports.postLogin = (req, res, next) => {


}