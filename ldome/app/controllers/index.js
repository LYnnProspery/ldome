var Movie = require('../models/movie-model');
var Category = require('../models/category-model');
var iconSrcs = [
	'http://7xwgqm.com1.z0.glb.clouddn.com/youdome/img/b-icon/b-animation.png', 
	'http://7xwgqm.com1.z0.glb.clouddn.com/youdome/img/b-icon/b-game.png',
	'http://7xwgqm.com1.z0.glb.clouddn.com/youdome/img/b-icon/b-music.png',
	'http://7xwgqm.com1.z0.glb.clouddn.com/youdome/img/b-icon/b-amusement.png',
	'http://7xwgqm.com1.z0.glb.clouddn.com/youdome/img/b-icon/b-movie.png',
	'http://7xwgqm.com1.z0.glb.clouddn.com/youdome/img/b-icon/b-digital.png',
	'http://7xwgqm.com1.z0.glb.clouddn.com/youdome/img/b-icon/b-guichu.png'
];
exports.getIndex =  function(req, res) {
	console.log('user in session');
	console.log(req.session.user);
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