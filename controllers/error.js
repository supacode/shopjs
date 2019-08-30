exports.get404 = (req, res, next) => {
	res.status(404).render('errors/404', {
		activeLink: '/404',
		pageTitle: 'Page not Found'
	});
}

exports.get500 = (req, res, next) => {
	res.status(500).render('errors/500', {
		activeLink: '/505',
		pageTitle: 'An Error Occured'
	});
}