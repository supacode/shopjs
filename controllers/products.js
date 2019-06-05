const Product = require('../models/product'); 

exports.getAddProduct = (req,res,next) => {
	res.render('admin/add-product', {
		pageTitle: 'Add Product',
		activeLink: '/add-product'
	});	
}

exports.postAddProduct = (req,res,next) => {
	
	const post = req.body;
	const product = new Product(post.name);
	product.save();
	res.redirect('/');

}

exports.getProducts  = (req,res,next) => {
	
	Product.fetchAll( products => 
		res.render('shop/product-list', {
			products,
			pageTitle: 'Home',
			activeLink: '/'
		}
	));

	
}