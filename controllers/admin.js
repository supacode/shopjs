const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
	res.render("admin/add-product", {
		pageTitle: "Add Product",
		activeLink: "/admin/add-product"
	});
};

exports.postAddProduct = (req, res, next) => {

	const post = req.body;
	const name = post.name;
	const price = post.price;
	const description = post.description;
	const imageUrl = post.imageUrl;
	const userId = req.user;

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
		.catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
	const id = req.params.id;
	Product.findById(id)
		.then(product => {
			res.render("admin/edit-product", {
				pageTitle: "Edit Product",
				activeLink: "/admin/edit-product",
				product
			});
		})
		.catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
	const id = req.body.productId;
	const name = req.body.name;
	const price = req.body.price;
	const description = req.body.description;
	const imageUrl = req.body.imageUrl;

	Product.findById(id)
		.then(product => {
			product.name = name;
			product.price = price;
			product.description = description;
			product.imageUrl = imageUrl;
			return product.save();
		})
		.then(() => {
			res.redirect(`/admin/products#${id}`);
		})
		.catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
	Product.find()
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

	Product.findByIdAndRemove(id)
		.then(() => {
			res.redirect("/admin/products");
		})
		.catch(err => console.log(err));
};