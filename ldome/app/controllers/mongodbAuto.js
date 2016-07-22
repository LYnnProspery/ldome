var fs = require('fs');
var mongoose = require('mongoose');
var Movie = require('../models/movie-model');
var Category = require('../models/category-model');
mongoose.connect('mongodb://localhost/theater');

// b-crawler-game.txt
// b-crawler-music.txt
// b-crawler-amusement.txt
// b-crawler-guichu.txt
// b-crawler-technology.txt
// b-crawler-film.txt
var arrStream = [
    'b-crawler-animation2.txt',
	'b-crawler-game2.txt',
	'b-crawler-music2.txt',
	'b-crawler-amusement2.txt',
	'b-crawler-guichu2.txt',
	'b-crawler-technology2.txt',
	'b-crawler-film2.txt',
	'b-crawler-animation.txt',
	'b-crawler-game.txt',
	'b-crawler-music.txt',
	'b-crawler-amusement.txt',
	'b-crawler-guichu.txt',
	'b-crawler-technology.txt',
	'b-crawler-film.txt'
];
var countryType = [
	'日本',
	'中国',
	'中国',
	'中国',
	'日本',
	'中国',
	'美国',
	'日本',
	'中国',
	'中国',
	'中国',
	'日本',
	'中国',
	'美国'
];
var languageType = [
	'日语',
	'汉语',
	'汉语',
	'汉语',
	'日语',
	'汉语',
	'美语',
	'日语',
	'汉语',
	'汉语',
	'汉语',
	'日语',
	'汉语',
	'美语'
];
var categoryType = [
	'动漫',
	'游戏',
	'音乐',
	'娱乐',
	'鬼畜',
	'科技',
	'影视',
	'动漫',
	'游戏',
	'音乐',
	'娱乐',
	'鬼畜',
	'科技',
	'影视'
];


arrStream.forEach(function(item, streamIndex) {
	var stream = fs.createReadStream(item);
	var string = '';
	stream.on('data', function(chunk) {
		string += chunk;
	});


	stream.on('end', function() {
		var arr = eval(string);
		// var item = arr[0];
		// var movie = new Movie({
		// 	name: item.name,
		// 	flash: item.flashSrc,
		// 	poster: item.imgSrc,s
		// 	doctor: item.author,
		// 	country: '日本',
		// 	language: '日语',
		// 	year: 2016,
		// 	detail: item.detail,
		// });
		// movie.save(function(err) {
		// 	if(err) {
		// 		console.log(err);
		// 	}
		// });
		// Category.
		// 	find({name: '动漫'}, function(err, result) {
		// 		result[0].movies.push(movie._id);
		// 		result[0].save(function(err) {
		// 			if(err) {
		// 				console.log(err);
		// 			}
		// 		});
		// 	});	
		arr.forEach(function(item, movieIndex) {
			var movie = new Movie({
				name: item.title,
				flash: item.flashSrc,
				poster: item.imgSrc,
				doctor: item.author,
				country: countryType[streamIndex],
				language: languageType[streamIndex],
				year: 2016,
				detail: item.detail,
				watched: 0
			});
			movie.save(function(err) {
				if(err) {
					console.log(err);
				}
			});


			Category.
				find({name: categoryType[streamIndex]}, function(err, result) {
					//console.log(result[0].movies.push(movie._id));
					result[0].movies.push(movie._id);
					result[0].save(function(err) {
						if(err) {
							console.log(err);
						}
					});
				});		
		});	
	});
});

// var string = "[{a: 'a'}, {b: 'b'}]";

// var arr = eval(string);
// console.log(arr[0]);
// var json = JSON.stringify(string);
// console.log(json);