var Category = require('../models/category-model');

exports.addCategory = function(req, res) {
	var name = req.body.category;
	var newCategory = new Category({
		name: name
	});
	newCategory.save(function(err, result) {
		if (err) {
			console.log(err);
		}
		console.log('save category success');
	});
};

exports.getCategory = function(req, res) {
	res.render('adminAddCategory');
};	