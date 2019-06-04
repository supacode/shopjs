const products = [];

exports.getAddProduct = (req,res,next) => {
	res.render('add-product', {
		pageTitle: 'Add Product',
		activeLink: '/add-product'
	});	
}

exports.postAddProduct = (req,res,next) => {
	
	const post = req.body;
	
	products.push({name: post.name})
	
	res.redirect('/');

}

exports.getProducts  = (req,res,next) => {
	res.render('home', {
		products,
		pageTitle: 'Home',
		activeLink: '/'
	});
}