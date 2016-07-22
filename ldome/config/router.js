// var Movie = require('../models/movie-model');
// var User = require('../models/user-model');
// var _ = require('underscore');
var Index = require('../app/controllers/index');
var Movies = require('../app/controllers/movies');
var User = require('../app/controllers/user');
var Comment = require('../app/controllers/comments');
var Category = require('../app/controllers/category');
module.exports = function(app) {
	app.use(function(req, res, next) {
		var _user = req.session.user;
		if(_user) {
			app.locals.user = _user;
		}
		next();
	});


	app.get('/', Index.getIndex);
	app.get('/movie/:id', Movies.getMovie);
	app.get('/admin/addmovie', User.loginRequired, User.adminRequired, Movies.adminAddMovies);
	app.post('/admin/movie/new', User.loginRequired, User.adminRequired, Movies.postInfo);
	app.get('/admin/update/:id', User.loginRequired, User.adminRequired, Movies.adminUpdate);
	app.get('/admin/movielist', User.loginRequired, User.adminRequired, Movies.adminGetMoviesList);
	app.delete('/adminlist', User.loginRequired, User.adminRequired, Movies.adminDelete);


	app.post('/user/signup', User.userSignUp);
	app.post('/user/login', User.userLogin);
	app.get('/user/logout', User.userLogout(app));

	app.post('/movie/comment', User.loginRequired, Comment.userComment);

	app.get('/admin/newcategory', Category.getCategory);
	app.post('/admin/addcategory', User.loginRequired, User.adminRequired, Category.addCategory);

	app.get('/admin/userlist', User.loginRequired, User.adminRequired, User.adminGetUserList);

	app.get('/movie/videolist/:category', Movies.getAllMovieOfCategory);

	//app.get('/movie/:category', )
};
	// app.get('/', function {
	// 	Movie
	// 		.fetchAll(function(err, movies){
	// 			if (err) {
	// 				console.log(err);
	// 			}
	// 			//console.log(movies);
	// 			res.render('index', {
	// 				title: 'LDome',
	// 				movies: movies
	// 			});
	// 		});
	// });

	// app.get('/movie/:id', function {
	// 	Movie
	// 		.fetchById(req.params.id, function(err, movie) {
	// 			if(err) {
	// 				console.log(err);
	// 			}
	// 			res.render('movieInfo', {
	// 				title: movie.name,
	// 				movie: movie
	// 			});
	// 		});
	// });

	// app.get('/admin/movie', function {
	// 	res.render('adminInsert', {
	// 		title: '添加新电影',
	// 		movie: {
	// 			name: '',
	// 			flash: '',
	// 			poster: '',
	// 			doctor: '',
	// 			country: '',
	// 			language: '',
	// 			year: '',
	// 			detail: ''
	// 		}
	// 	});
	// });

	// app.post('/admin/movie/new', function {
	// 	var oMovie = req.body;
	// 	var id = req.body._id;

	// 	if(id !== 'undefined') {
	// 		Movie
	// 			.fetchById(id, function(err, movie) {
	// 				if(err) {
	// 					console.log(err);
	// 				}
	// 				var _movie = _.extend(movie, oMovie);
	// 				_movie.save(function(err, movie) {
	// 					if(err) {
	// 						console.log(err);
	// 					}
	// 					res.redirect('/movie/' + movie._id);
	// 				});
	// 			});
	// 	} else {
	// 		var _movie = new Movie({
	// 			name: oMovie.name,
	// 			flash: oMovie.flash,
	// 			poster: oMovie.poster,
	// 			doctor: oMovie.doctor,
	// 			country: oMovie.country,
	// 			language: oMovie.language,
	// 			year: oMovie.year,
	// 			detail: oMovie.detail
	// 		});
	// 		_movie.save(function(err, movie) {
	// 			console.log(err);
	// 			res.redirect('/movie/' + movie._id);
	// 		});
	// 	}
	// });

	// app.get('/admin/update/:id', function {
	// 	var id = req.params.id;
	// 	Movie
	// 		.fetchById(id, function(err, movie) {
	// 			if(err) {
	// 				console.log(err);
	// 			}
	// 			res.render('adminInsert', {
	// 				title: movie.name + '信息修改',
	// 				movie: movie
	// 			});
	// 		});
	// });

	// app.get('/adminlist', function {
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
	// });

	// app.delete('/adminlist', function {
	// 	var id = req.query.id;
	// 	if (id) {
	// 		Movie.remove({_id: id}, function(err, result) {
	// 			if(err) {
	// 				console.log(err);
	// 			}
	// 			res.json({state: 1});
	// 		});
	// 	}
	// });

// 	app.post('/user/signup', function {
// 		var user = new User({
// 			username: req.body.username,
// 			password: req.body.password
// 		});
// 		console.log(user.username);
// 		User
// 			.findOne({username: user.username}, function(err, result) {
// 				if(err) {
// 					console.log(err + 'with search');
// 					return res.json({
// 						state: 0,
// 						user: user.username
// 					});
// 				}
// 				if(result === null) {
// 					user.save(function(err) {
// 						if (err) {
// 							console.log(err + 'with save');
// 							return res.json({
// 								state: 0,
// 								user: user.username
// 							});
// 						}
// 						res.json({
// 							state: 1,
// 							user:  user.username
// 						});
// 					});
// 				} else {
// 					res.json({
// 						state: 0,
// 						user: user.username
// 					});
// 				}
// 			});
// 	});

// 	app.post('/user/login', function {
		
// 		var username = req.body.username;
// 		var password = req.body.password;
		
// 		console.log('user: ' + username + 'pass: ' + password);
// 		User
// 			.findOne({username: username}, function(err, result) {
// 				if(err) {
// 					return console.log(err);
// 				}
// 				if(result === null) {
// 					return res.json({
// 								state: 0,
// 								user: username
// 						   });
// 				}
// 				result.comparePass(password, function(err, isMatch) {
// 					if(err) {
// 						res.json({
// 							state: 0,
// 							user: username
// 						});
// 					} 
// 					if (isMatch) {
// 						req.session.user = result;
// 						res.json({
// 							state: 1,
// 							user: username
// 						});
// 					} else {
// 						res.json({
// 							state: 0,
// 							user: username
// 						});
// 					}
// 				});
// 			});
// 	});

// 	app.get('/user/logout', function {
// 		delete req.session.user;
// 		delete app.locals.user;
// 		res.redirect('/');
// 	});
// };