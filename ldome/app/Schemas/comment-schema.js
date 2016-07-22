var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;


var CommentSchema = Schema({
	content: String,
	reply: [{
		from: {
			type: ObjectId,
			ref: 'User'
		},
		to: {
			type: ObjectId,
			ref: 'User'
		},
		content: String,
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}],
	to: {
		type: ObjectId,
		ref: 'User'
	},
	from: {
		type: ObjectId,
		ref: 'User'
	},
	theMovie: {
		type: ObjectId,
		ref: 'Movie'
	},
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
});

CommentSchema.pre('save', function(next) {
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}
	next();
});

CommentSchema.statics = {
	fetchAll: function(cb) {
		return this.find({}, cb);
	},
	fetchById: function(id, cb) {
		return this.findOne({_id: id}, cb);
	}
};

module.exports = CommentSchema;