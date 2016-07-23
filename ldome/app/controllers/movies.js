var Movie = require('../models/movie-model');
var _ = require('underscore');
var Comment = require('../models/comment-model');
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

exports.getMovie =	function(req, res) {
	Movie
		.fetchById(req.params.id, function(err, movie) {
			if(err) {
				console.log(err);
			}
			movie.watched++;
			movie.save(function(err) {
				if(err) {
					console.log(err);
				}
			});
			Comment
				.find({theMovie: movie._id})
				.populate('from', 'username')
				.populate('reply.to reply.from', 'username')
				.exec(function(err, comments) {
					if(err) {
						console.log('fetch comment err: ' + err);
					}
					res.render('movieInfo', {
						title: movie.name,
						movie: movie,
						comments: comments.reverse()
					});
				});
		});
};

exports.adminAddMovies =  function(req, res) {
	Category.fetchAll(function(err, categories) {
		if (err) {
			console.log('fetch categories err' + err);
		}
		console.log("begin addmovie");
		res.render('adminInsert', {
			title: '添加新电影',
			categories: categories,
			movie: {}
		});
	});
};

exports.postInfo =  function(req, res) {
	var oMovie = req.body;
	var id = req.body._id;

	if(id) {
		Movie
			.fetchById(id, function(err, movie) {
				if(err) {
					console.log(err);
				}
				console.log(movie.category);
				var _movie = _.extend(movie, oMovie);
				console.log('update');
				console.log(_movie.category);
				if (movie.category === _movie.category) {
					_movie.save(function(err, movie) {
						if (err) {
							console.log(err);
						}
						res.redirect('/movie/' + movie._id);
					});
				} else {
					Category
						.findById(_movie.category, function(err, category) {
								category.movies.push(_movie);
								category.save(function(err, result){
									_movie.save(function(err, movie) {
										if (err) {
											console.log(err);
										}
										res.redirect('/movie/' + movie._id);
									});
								});
						});
				}
			});
	} else {
		// var _movie = new Movie({
		// 	name: oMovie.name,
		// 	flash: oMovie.flash,
		// 	poster: oMovie.poster,
		// 	doctor: oMovie.doctor,
		// 	country: oMovie.country,
		// 	language: oMovie.language,
		// 	year: oMovie.year,
		// 	detail: oMovie.detail
		// });
		console.log('add');
		var _movie = new Movie(oMovie);
		console.log(_movie);
		Category
			.findById(_movie.category, function(err, category) {
				console.log(category);
				category.movies.push(_movie);
				category.save(function(err, result) {
					_movie.save(function(err, movie) {
						console.log(err);
						res.redirect('/movie/' + movie._id);
					});
				});
			});
	}
};

exports.adminUpdate = function(req, res) {
	var id = req.params.id;
	Movie
		.fetchById(id, function(err, movie) {
			if(err) {
				console.log(err);
			}
			console.log("beginupdate");
			Category.fetchAll(function(err, categories) {
				res.render('adminInsert', {
					title: movie.name + '信息修改',
					movie: movie,
					categories: categories
				});
			});
		});
};

// exports.adminMoviesList = function(req, res) {
// 	Movie
// 		.fetchAll(function(err, movies) {
// 			if(err) {
// 				console.log(err);
// 			}
// 			res.render('adminlist', {
// 				title: '电影列表后台管理',
// 				movies: movies
// 			});
// 		});
// };

exports.adminDelete =  function(req, res) {
	var id = req.query.id;
	if (id) {
		Movie.remove({_id: id}, function(err, result) {
			if(err) {
				console.log(err);
			}
			res.json({state: 1});
		});
	}
};

exports.adminGetMoviesList =  function (req, res){
	Movie
		.fetchAll(function(err, movies) {
			if(err) {
				console.log(err);
			}
			res.render('adminlist', {
				title: '电影列表后台管理',
				movies: movies
			});
		});
};


exports.getAllMovieOfCategory = function(req, res) {
	var theCategory = req.query.category;
	var page = req.query.page;
	var listIndex = 0;
	//console.log(theCategory);
	//res.send(theCategory);
	//console.log(page + theCategory);
	var pageLimit = 16;
	var pageCount = 0;
	Category
		.find({}) 
		.populate({path: 'movies'})
		.exec(function(err, categories) {
			if(err) {
				console.log(err);
			}

			categories.forEach(function(item, index) {
				if (item.name === theCategory) {
					listIndex = index;
				}
			});

			pageCount = Math.ceil(categories[listIndex].movies.length / pageLimit);

			res.render('allMovieList', {
				title: 'YouDome',
				categories: categories,
				icons: iconSrcs,
				listIndex: listIndex,
				currentPage: page,
				limit: pageLimit,
				pageCount: pageCount
			});
		});	
};

exports.getSearch = function(req, res) {
	var keyword = req.query.keyword;
	var page = req.query.page;
	var reg = new RegExp('.*' + keyword + '.*', 'i');

	var pageLimit = 16;
	var pageCount = 0;


	Movie
		.find({name: reg})
		.exec(function(err, movies) {
			if (err) {
				console.log(err);
			}

			pageCount = Math.ceil(movies.length / pageLimit);
			res.render('search', {
				title: 'YouDome Search',
				keyword: keyword,
				result: movies,
				currentPage: page,
				limit: pageLimit,
				pageCount: pageCount
			});
		});
};

















