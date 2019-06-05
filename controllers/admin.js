const Product = require('../models/product')

exports.getAddProduct = (req,res,next) => {
	res.render('admin/add-product', {
		pageTitle: 'Add Product',
		activeLink: '/admin/add-product'
	});	
}

exports.postAddProduct = (req,res,next) => {
    const post = req.body;
    const name = post.name;
    const price = post.price;
    const description = post.description;
    const imageUrl = post.imageUrl;
    const product = new Product(name,price,description,imageUrl);
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
