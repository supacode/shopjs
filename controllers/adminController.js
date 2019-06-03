exports.getAddProduct = (req,res,next) => {
	res.render('add-product', {
		pageTitle: 'Add Product',
		activeLink: '/add-product'
	});	
}