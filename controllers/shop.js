const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
	Product.find()
		.then(products => {
			res.render('shop/product-list', {
				products,
				pageTitle: 'Products',
				activeLink: '/products'
			})
		})
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
	Product.find()
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



exports.postCartDeleteProduct = (req, res, next) => {

	const productId = req.body.productId;

	req.user.deleteFromCart(productId)
		.then(result => {
			res.redirect('back');
		})
		.catch(err => console.log(err));
};



exports.getCart = (req, res, next) => {
	req.user
		.populate('cart.items.productId')
		.execPopulate()
		.then(user => {
			res.render('shop/cart', {
				activeLink: '/cart',
				pageTitle: 'Cart',
				products: user.cart.items
			})
		})
		.catch(err => console.log(err));
}


exports.postCart = (req, res, next) => {

	const productId = req.body.product;
	return Product.findById(productId)
		.then(product => {
			return req.user.addToCart(product);
		})
		.then(() => res.redirect('cart'))
		.catch(err => console.log(err));

}

exports.getOrders = (req, res, next) => {
	req.user
		.getOrders()
		.then(orders => {
			res.render('shop/orders', {
				activeLink: '/orders',
				pageTitle: 'Your Orders',
				orders
			});
		})
		.catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {

	req.user
		.populate('cart.items.productId')
		.execPopulate()
		.then(user => {

			// Map products on User document to product
			const products = user.cart.items.map(product => {
				return {
					quantity: product.quantity,
					product: {
						...product.productId._doc
					}
				};
			});

			const order = new Order({
				products,
				user: {
					username: req.user.username,
					userId: req.user
				}
			});

			return order.save();
		})
		.then(() => req.user.emptyCart())
		.then(() => res.redirect('back'))
		.catch(err => console.log(err));
}

exports.getCheckout = (req, res, next) => {
	res.render('shop/checkout', {
		products,
		pageTitle: 'Checkout',
		activeLink: '/checkout'
	})
}