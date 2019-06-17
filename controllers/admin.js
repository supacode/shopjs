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
  const productID = req.params.id;
  Product.findById(productID, product => {
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      activeLink: "/admin/edit-product",
      product
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;

  newName = req.body.name;
  newPrice = req.body.price;
  newDescription = req.body.description;
  newImageUrl = req.body.imageUrl;

  const updatedProduct = new Product(
    productId,
    newName,
    newPrice,
    newDescription,
    newImageUrl
  );

  console.log(updatedProduct.save());

  res.redirect(`/products#${productId}`);
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(([products]) => {
      res.render("admin/products", {
        products,
        pageTitle: "Admin Products",
        activeLink: "/admin/products"
      });
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
