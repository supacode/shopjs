const Product = require('../models/product')

exports.getAddProduct = (req,res,next) => {
	res.render('admin/add-product', {
		pageTitle: 'Add Product',
		activeLink: '/admin/add-product'
	});	
}

exports.postAddProduct = (req,res,next) => {
	const product = new Product(post.name);
	product.save();
	res.redirect('/');
}


exports.getProducts  = (req,res,next) => {
	Product.fetchAll( products => 
		res.render('admin/products', {
			products,
			pageTitle: 'Admin Products',
			activeLink: '/admin/products'
		}
	));
}
