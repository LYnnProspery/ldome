var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var MovieSchema = Schema({
	name: String,
	doctor: String,
	language: String,
	country: String,
	detail: String,
	poster: String,
	flash: String,
	year: Number,
	watched: {
		type: Number,
		default: 0
	},
	category: {
		type: ObjectId,
		ref: 'Category'
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

MovieSchema.pre('save', function(next) {
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}
	next();
});

MovieSchema.statics = {
	fetchAll: function(cb) {
		return this.find({}, cb);
	},
	fetchById: function(id, cb) {
		return this.findOne({_id: id}, cb);
	}
};

module.exports = MovieSchema;