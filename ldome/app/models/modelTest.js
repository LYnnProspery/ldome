var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/theater');
var Movie = require('./movie-model');


var movie1 = new Movie({
	name: '1',
	flash: '1',
	poster: '1',
	doctor: '1123',
	country: '123',
	language: '123',
	year: 123,
	detail: '123'
});

//console.log(movie1);
movie1.save(function(err) {
	if(err) {
		console.log(err);
	}
});
//console.log(movie1);

//var Movie = mongoose.model('Movie', MovieSchema);


// var MovieSchema = new mongoose.Schema({
// 	name: String,
// 	doctor: String,
// 	language: String,
// 	country: String,
// 	detail: String,
// 	poster: String,
// 	flash: String,
// 	year: Number,
// 	meta: {
// 		createAt: {
// 			type: Date,
// 			default: Date.now()
// 		},
// 		updateAt: {
// 			type: Date,
// 			default: Date.now()
// 		}
// 	}
// });
// console.log(MovieSchema);
// var Movie = mongoose.model('Movie', MovieSchema);


// var movie1 = new Movie({
// 	name: 'asd',
// 	year: 123
// });

// movie1.save(function(err) {
// 	if(err) {
// 		console.log(err);
// 	}
// });