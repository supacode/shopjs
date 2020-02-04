const { validationResult } = require('express-validator');

const fileHelper = require('../util/file');
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    activeLink: '/admin/add-product',
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

exports.postAddProduct = async (req, res, next) => {
  const { name, price, description } = req.body;
  const image = req.file;
  const userId = req.user._id;

  if (!image) {
    return res.status(422).render('admin/add-product', {
      pageTitle: 'Add Product',
      activeLink: '/admin/add-product',
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
    return res.status(422).render('admin/add-product', {
      pageTitle: 'Add Product',
      activeLink: '/admin/add-product',
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

  try {
    const newProduct = await product.save();
    res.redirect(`/admin/products#${newProduct._id}`);
  } catch (err) {
    throw new Error(err);
  }
};

exports.getEditProduct = async (req, res, next) => {
  const { id } = req.params;

  let errorMsg = req.flash('error');

  if (errorMsg.length > 0) {
    errorMsg = errorMsg[0];
  } else {
    errorMsg = null;
  }

  try {
    const product = await Product.findById(id);
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      activeLink: '/admin/edit-product',
      product,
      errorMsg,
      validationErrors: []
    });
  } catch (err) {
    throw new Error(err);
  }
};

exports.postEditProduct = async (req, res, next) => {
  const { productId, name, price, description } = req.body;
  const image = req.file;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('admin/edit-product', {
      pageTitle: 'Edit Product',
      activeLink: '/admin/edit-product',
      product: {
        _id: productId,
        name,
        price,
        description
      },
      errorMsg: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  const product = await Product.findOne({
    _id: productId,
    userId: req.user._id
  });

  product.name = name;
  product.price = price;
  product.description = description;

  if (image) {
    fileHelper.deleteFile(product.imageUrl);
    product.imageUrl = image.path;
  }

  await product.save();

  return res.redirect(`/admin/products#${productId}`);
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ userId: req.user._id });
    res.render('admin/products', {
      products,
      pageTitle: 'Admin Products',
      activeLink: '/admin/products'
    });
  } catch (err) {
    throw new Error(err);
  }
};

exports.postDeleteProduct = async (req, res, next) => {
  const { productId } = req.body;
  const product = await Product.findOne({
    _id: productId,
    userId: req.user._id
  });

  fileHelper.deleteFile(product.imageUrl);

  await Product.deleteOne({
    _id: productId,
    userId: req.user._id
  });

  return res.redirect('/admin/products');
};
