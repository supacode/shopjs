const {
	validationResult
} = require('express-validator');

const Product = require("../models/product");


exports.getAddProduct = (req, res, next) => {



	res.render("admin/add-product", {
		pageTitle: "Add Product",
		activeLink: "/admin/add-product",
		oldValues: {
			name: '',
			price: '',
			description: '',
			imageUrl: ''
		},
		errorMsg: '',
		validationErrors: []
	});
};

exports.postAddProduct = (req, res, next) => {

	const name = req.body.name;
	const price = req.body.price;
	const description = req.body.description;
	const image = req.file;
	const userId = req.user._id;

	if (!image) {
		return res.status(422).render("admin/add-product", {
			pageTitle: "Add Product",
			activeLink: "/admin/add-product",
			oldValues: {
				name,
				price,
				description,
				imageUrl
			},
			errorMsg: 'Attached file must be an image.',
			validationErrors: []
		});
	}
	const imageUrl = image.path;
	const errors = validationResult(req);



	if (!errors.isEmpty()) {
		return res.status(422).render("admin/add-product", {
			pageTitle: "Add Product",
			activeLink: "/admin/add-product",
			oldValues: {
				name,
				price,
				description,
				imageUrl
			},
			errorMsg: errors.array()[0].msg,
			validationErrors: errors.array()
		});
	}


	const product = new Product({
		name,
		price,
		description,
		imageUrl,
		userId
	});

	product.save()
		.then(product => {
			res.redirect(`/admin/products#${product._id}`);
		})
		.catch(err => {
			throw new Error(err);
		});
};

exports.getEditProduct = (req, res, next) => {
	const id = req.params.id;

	let errorMsg = req.flash('error');
	(errorMsg.length) ? errorMsg = errorMsg[0]: errorMsg = null;

	Product.findById(id)
		.then(product => {
			res.render("admin/edit-product", {
				pageTitle: "Edit Product",
				activeLink: "/admin/edit-product",
				product,
				errorMsg,
				validationErrors: []
			});
		})
		.catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
	const id = req.body.productId;
	const name = req.body.name;
	const price = req.body.price;
	const description = req.body.description;
	const image = req.file;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).render("admin/edit-product", {
			pageTitle: "Edit Product",
			activeLink: "/admin/edit-product",
			product: {
				_id: id,
				name,
				price,
				description
			},
			errorMsg: errors.array()[0].msg,
			validationErrors: errors.array()
		});
	}


	Product.findOne({
			_id: id,
			userId: req.user._id
		})
		.then(product => {
			if (!product) {
				return res.redirect('/admin/products')
			}
			product.name = name;
			product.price = price;
			product.description = description;
			if (image) {
				product.imageUrl = image.path;
			}
			return product.save();
		})
		.then(() => {
			res.redirect(`/admin/products#${id}`);
		})
		.catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
	Product.find({
			userId: req.user._id
		})
		.then(products => {
			res.render("admin/products", {
				products,
				pageTitle: "Admin Products",
				activeLink: "/admin/products"
			});
		})
		.catch(err => console.log(err));
};
exports.postDeleteProduct = (req, res, next) => {
	const id = req.body.productId;

	Product.deleteOne({
			_id: id,
			userId: req.user._id
		})
		.then(() => {
			res.redirect("/admin/products");
		})
		.catch(err => console.log(err));
};