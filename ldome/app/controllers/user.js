var User = require('../models/user-model');

exports.loginRequired = function(req, res, next) {
	var _user = req.session.user;
	if(!_user) {
		return res.redirect('/');
	}
	next();
};

exports.adminRequired = function(req, res, next) {
	var _user = req.session.user;
	if(_user.role <= 10 || !_user.role) {
		return res.redirect('/');
	}
	next();
};


exports.userSignUp =  function(req, res) {
	var user = new User({
		username: req.body.username,
		password: req.body.password
	});
	console.log(user.username);
	User
		.findOne({username: user.username}, function(err, result) {
			if(err) {
				console.log(err + 'with search');
				return res.json({
					state: 0,
					user: user.username
				});
			}
			if(result === null) {
				user.save(function(err) {
					if (err) {
						console.log(err + 'with save');
						return res.json({
							state: 0,
							user: user.username
						});
					}
					res.json({
						state: 1,
						user:  user.username
					});
				});
			} else {
				res.json({
					state: 0,
					user: user.username
				});
			}
		});
};

exports.userLogin =  function(req, res) {
	
	var username = req.body.username;
	var password = req.body.password;
	
	console.log('user: ' + username + 'pass: ' + password);
	User
		.findOne({username: username}, function(err, result) {
			if(err) {
				return console.log(err);
			}
			if(result === null) {
				return res.json({
							state: 0,
							user: username
					   });
			}
			result.comparePass(password, function(err, isMatch) {
				if(err) {
					res.json({
						state: 0,
						user: username
					});
				} 
				if (isMatch) {
					req.session.user = result;
					res.json({
						state: 1,
						user: username
					});
				} else {
					res.json({
						state: 0,
						user: username
					});
				}
			});
		});
};

exports.userLogout =  function(app) {
	return function(req, res) {
		delete req.session.user;
		delete app.locals.user;
		res.redirect('/');
	};
};

exports.adminGetUserList = function(req, res) {
	User
		.fetchAll(function(err, users) {
			if(err) {
				console.log(err);
			}
			res.render('userList', {
				title: '用户管理',
				userList: users
			});
		});
};
