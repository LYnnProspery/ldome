var mongoose = require('mongoose');
var CommentSchema = require('../Schemas/comment-schema');
var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;