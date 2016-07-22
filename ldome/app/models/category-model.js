var mongoose = require('mongoose');
var CategorySchema = require('../Schemas/category-schema');
var Category = mongoose.model('Category', CategorySchema);

module.exports = Category;