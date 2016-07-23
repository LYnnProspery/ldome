var Movie = require('../models/movie-model');
var Category = require('../models/category-model');
var iconSrcs = [
	'/b-icon/b-animation.png', 
	'/b-icon/b-game.png',
	'/b-icon/b-music.png',
	'/b-icon/b-amusement.png',
	'/b-icon/b-movie.png',
	'/b-icon/b-digital.png',
	'/b-icon/b-guichu.png'
];
exports.getIndex =  function(req, res) {
	Category
		.find({}) 
		//.populate({path: 'movies', options: {limit: 8}})
		.populate({path: 'movies'})
		.exec(function(err, categories) {
			if(err) {
				console.log(err);
			}
			res.render('index', {
				title: 'YouDome',
				categories: categories,
				icons: iconSrcs,
				//numbers: aResultNum
				random: Math.floor(Math.random() * 10) + 1
			});
		});
		// .fetchAll(function(err, categories){
		// 	if (err) {
		// 		console.log(err);
		// 	}
		// 	console.log(categories);
		// 	res.render('index', {
		// 		title: 'LDome',
		// 		categories: categories,
		// 		icons: iconSrcs,
		// 		//numbers: aResultNum
		// 	});
		// });
};