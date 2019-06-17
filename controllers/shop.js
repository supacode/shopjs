const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
	Product.fetchAll()
		.then(([rows, field]) =>
			res.render('shop/product-list', {
				products: rows,
				pageTitle: 'Home',
				activeLink: '/products'
			}))
		.catch(err => console.log(err))
}


exports.getProduct = (req, res, next) => {
	const id = req.params.id;
	Product.findById(id)
		.then(([product]) => {
			product = product[0];
			res.render('shop/product-detail', {
				product,
				pageTitle: product.name,
				activeLink: '/products'
			});
			console.log(product);
		})
		.catch(err => console.log(err));

}


exports.getIndex = (req, res, next) => {
	Product.fetchAll()
		.then(([rows, field]) => {
			res.render('shop/index', {
				products: rows,
				pageTitle: 'Home',
				activeLink: '/'
			});
		})
		.catch(err => console.log(err));

}

exports.getCart = (req, res, next) => {
	res.render('shop/cart', {
		pageTitle: 'Cart',
		activeLink: '/cart'
	})
}

exports.postCart = (req, res, next) => {
	const productId = req.body.product;

	Product.findById(productId, product => {
		Cart.addProduct(productId, product.price);
	});

	res.redirect('/cart');

}


exports.getOrders = (req, res, next) => {
	res.render('shop/orders', {
		pageTitle: 'Orders',
		activeLink: '/orders'
	})
}

exports.getCheckout = (req, res, next) => {
	res.render('shop/checkout', {
		products,
		pageTitle: 'Checkout',
		activeLink: '/checkout'
	})
}