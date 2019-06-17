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

	Product.create({
			name,
			price,
			description,
			imageUrl
		})
		.then(result => console.log(result))
		.catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
	const id = req.params.id;

	Product.findAll({
			where: {
				id
			}
		})
		.then(product => {
			product = product[0];
			res.render("admin/edit-product", {
				pageTitle: "Edit Product",
				activeLink: "/admin/edit-product",
				product
			})
		})
		.catch(err => console.log(err));

};

exports.postEditProduct = (req, res, next) => {
	const id = req.body.productId;

	const newName = req.body.name;
	const newPrice = req.body.price;
	const newDescription = req.body.description;
	const newImageUrl = req.body.imageUrl;

	Product.findAll({
			where: {
				id
			}
		})
		.then(product => {
			product = product[0];
			product.name = newName;
			product.price = newPrice;
			product.description = newDescription;
			product.imageUrl = newImageUrl;
			return product.save();
		})
		.then( result => {
			console.log('Product Updated');
		})
		.catch(err => console.log(err));

	res.redirect(`/products#${id}`);
};

exports.getProducts = (req, res, next) => {

	Product.findAll()
		.then(products => {

			res.render("admin/products", {
				products,
				pageTitle: "Admin Products",
				activeLink: "/admin/products"
			})
		})
		.catch(err => console.log(err));

};

exports.postDeleteProduct = (req, res, next) => {
	const productId = req.body.productId;

	Product.deleteById(productId)
		.then(result => console.log(result))
		.catch(err => console.log(err));

	res.redirect("/admin/products");
};