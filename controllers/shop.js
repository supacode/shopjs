const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
	Product.findAll()
		.then((products) =>
			res.render('shop/product-list', {
				products,
				pageTitle: 'Home',
				activeLink: '/products'
			}))
		.catch(err => console.log(err))
}


exports.getProduct = (req, res, next) => {
	const id = req.params.id;

	Product.findByPk(id)
		.then((product) => {
			res.render('shop/product-detail', {
				product,
				pageTitle: product.name,
				activeLink: '/products'
			});

		})
		.catch(err => console.log(err));

}


exports.getIndex = (req, res, next) => {
	Product.findAll()
		.then((products) => {
				res.render('shop/index', {
					products,
					pageTitle: "Home",
					activeLink: '/'
				});
			}

		)
		.catch(err => console.log(err));


}

exports.getCart = (req, res, next) => {

	req.user.getCart()
		.then(cart => {
			req.user.getProducts().then(products => {
				res.render('shop/cart', {
					pageTitle: 'Cart',
					activeLink: '/cart',
					products
				});
			}).catch(err => console.log(err));
		})
		.catch(err => console.log(err));


}

exports.postCart = (req, res, next) => {
	const productId = req.body.product;
	let fetchedCart;
	req.user.getCart()
		.then(cart => {
			fetchedCart = cart;
			return cart.getProducts({
				where: {
					id: productId
				}
			});
		})
		.then(products => {
			let product;

			if (products.length) {
				product = products[0];
			}
			let newQuantity = 1;
			if (product) {
				// Add new quantity
			}

			return Product.findByPk(productId)
				.then(product => {
					return fetchedCart.addProduct(product, {
						through: {
							quantity: newQuantity
						}
					});
				})
				.catch(err => console.log(err));

		})
		.then(() => res.redirect('cart'))
		.catch(err => console.log(err));

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