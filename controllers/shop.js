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

exports.getIndex  = (req,res,next) => {
	Product.fetchAll( products => 
		res.render('shop/index', {
			products,
			pageTitle: 'Home',
			activeLink: '/index'
		}
	));
}

exports.getCart  = (req,res,next) => {
    res.render('shop/cart', {
        pageTitle: 'Cart',
        activeLink: '/cart'
    })
}

exports.getCheckout  = (req,res,next) => {
    res.render('shop/checkout', {
        products,
        pageTitle: 'Checkout',
        activeLink: '/checkout'
    })
}
	

