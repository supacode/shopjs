const Product = require('../models/product');
const Order = require('../models/order');
const ITEMS_PER_PAGE = 3;

exports.getIndex = (req, res, next) => {

	const page = +req.query.page || 1;
	let totalProducts;

	Product.find()
		.countDocuments()
		.then(numProducts => {
			totalProducts = numProducts;
			return Product.find()
				.skip((page - 1) * ITEMS_PER_PAGE)
				.limit(ITEMS_PER_PAGE)
		})
		.then((products) => {
				res.render('shop/index', {
					products,
					pageTitle: 'Home',
					activeLink: '/',
					currentPage: page,
					hasNextPage: ITEMS_PER_PAGE * page < totalProducts,
					hasPreviousPage: page > 1,
					nextPage: page + 1,
					previousPage: page - 1,
					lastPage: Math.ceil(totalProducts / ITEMS_PER_PAGE)
				});
			}

		)
		.catch(err => console.log(err));
}


exports.getProducts = (req, res, next) => {
	const page = +req.query.page || 1;
	let totalProducts;

	Product.find()
		.countDocuments()
		.then(numProducts => {
			totalProducts = numProducts;
			return Product.find()
				.skip((page - 1) * ITEMS_PER_PAGE)
				.limit(ITEMS_PER_PAGE)
		})
		.then(products => {
			res.render('shop/product-list', {
				products,
				pageTitle: 'Products',
				activeLink: '/products',
				currentPage: page,
				hasNextPage: ITEMS_PER_PAGE * page < totalProducts,
				hasPreviousPage: page > 1,
				nextPage: page + 1,
				previousPage: page - 1,
				lastPage: Math.ceil(totalProducts / ITEMS_PER_PAGE)
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
				activeLink: '/products',
				isAuth: req.session.isLoggedIn
			});

		})
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
				products: user.cart.items,
				isAuth: req.session.isLoggedIn
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
		.then(() => res.redirect('/cart'))
		.catch(err => console.log(err));

}

exports.getOrders = (req, res, next) => {

	Order.find({
			'user.id': req.user._id
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
					email: req.user.email,
					id: req.user
				}
			});

			return order.save();
		})
		.then(() => req.user.emptyCart())
		.then(() => res.redirect('/orders'))
		.catch(err => console.log(err));
}

exports.getCheckout = (req, res, next) => {
	res.render('shop/checkout', {
		products,
		pageTitle: 'Checkout',
		activeLink: '/checkout'

	})
}