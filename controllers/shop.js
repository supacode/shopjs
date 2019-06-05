const Product = require('../models/product'); 


exports.getProducts  = (req,res,next) => {
	Product.fetchAll( products => 
		res.render('shop/product-list', {
			products,
			pageTitle: 'Home',
			activeLink: '/products'
		}
	));
}


exports.getProduct = (req,res,next) => {
	const id = req.params.id;
	console.log(id);
	res.redirect('/');
}


exports.getIndex  = (req,res,next) => {
	Product.fetchAll( products => 
		res.render('shop/index', {
			products,
			pageTitle: 'Home',
			activeLink: '/'
		}
	));
}

exports.getCart  = (req,res,next) => {
    res.render('shop/cart', {
        pageTitle: 'Cart',
        activeLink: '/cart'
    })
}
exports.getOrders  = (req,res,next) => {
    res.render('shop/orders', {
        pageTitle: 'Orders',
        activeLink: '/orders'
    })
}

exports.getCheckout  = (req,res,next) => {
    res.render('shop/checkout', {
        products,
        pageTitle: 'Checkout',
        activeLink: '/checkout'
    })
}
	

