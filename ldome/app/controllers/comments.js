var Comment = require('../models/comment-model');

exports.userComment = function(req, res) {

	var theMovie = req.body.theMovie;
	var theUser = req.body.theUser;
	var content = req.body.comment;
	var replyTo = req.body.replyTo;

	console.log(req.body);
	if(replyTo) {
		var replyBase = req.body.replyBase;
		var reply = {
			from: theUser,
			to: replyTo,
			content: content
		};
		console.log(replyBase + 'reply-base');
		Comment
			.findById(replyBase, function(err, comment) {
				console.log(comment);
				comment.reply.push(reply);
				comment.save(function(err, result) {
					if(err) {
						console.log(err);
					}
					res.json({
						state: 1
					});
				});
			});
	} else {
		var comment = new Comment({
			content: content,
			from: theUser,
			theMovie: theMovie
		});
		comment.save(function(err) {
			if(err) {
				console.log('commenet err: ' + err);
			}
			res.json({
				state: 1
			});
		});
	}
};