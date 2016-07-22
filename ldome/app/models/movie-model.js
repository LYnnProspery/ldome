var mongoose = require('mongoose');
var MovieSchema = require('../Schemas/movie-schema');

var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;