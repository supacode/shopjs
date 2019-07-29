const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
	Product.fetchAll()
		.then(products =>
			res.render('shop/product-list', {
				products,
				pageTitle: 'Home',
				activeLink: '/products'
			}))
		.catch(err => console.log(err))
}


exports.getProduct = (req, res, next) => {
	const id = req.params.id;


	Product.findById(id)
		.then(product => {
			res.render('shop/product-detail', {
				product,
				pageTitle: product.name,
				activeLink: '/products'
			});

		})
		.catch(err => console.log(err));

}


exports.getIndex = (req, res, next) => {
	Product.fetchAll()
		.then((products) => {
				res.render('shop/index', {
					products,
					pageTitle: 'Home',
					activeLink: '/'
				});
			}

		)
		.catch(err => console.log(err));


}

exports.getCart = (req, res, next) => {
	req.user.getCart()
		.then(products => {
			res.render('shop/cart', {
				activeLink: '/cart',
				pageTitle: 'Cart',
				products
			})
		})
		.catch(err => console.log(err));
}


exports.postCartDeleteProduct = (req, res, next) => {
	const productId = req.body.productId;
	req.user.deleteFromCart(productId)
		.then(result => {
			res.redirect('/cart');
		})
		.catch(err => console.log(err));
};



exports.postCart = (req, res, next) => {
	const product = req.body.product;
	Product.findById(product)
		.then(prod => {
			return req.user.addToCart(prod);
		})
		.then(result => {
			res.redirect('/cart');
		})

}


exports.getOrders = (req, res, next) => {
	exports.getOrders = (req, res, next) => {
		req.user
			.getOrders({
				include: ['products']
			})
			.then(orders => {
				res.render('shop/orders', {
					activeLink: '/orders',
					pageTitle: 'Your Orders',
					orders
				});
			})
			.catch(err => console.log(err));
	};


	exports.getCheckout = (req, res, next) => {
		res.render('shop/checkout', {
			products,
			pageTitle: 'Checkout',
			activeLink: '/checkout'
		})
	}

	exports.postOrder = (req, res, next) => {
		let fetchedCart;
		req.user.getCart()
			.then(cart => {
				fetchedCart = cart;
				return cart.getProducts();
			})
			.then(products => {
				req.user.createOrder()
					.then(order => {
						return order.addProducts(
							products.map(product => {
								product.orderItem - {
									quantity: product.cartItem.quantity
								};
								return product;
							}))
					});
				console.log(products);
			})
			.catch(err => console.log(err));
	}

}