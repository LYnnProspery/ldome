var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CategorySchema = Schema({
	name: String,
	movies: [{
		unique: true,
		type: ObjectId,
		ref: 'Movie'
	}],
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

CategorySchema.pre('save', function(next) {
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}
	next();
});

CategorySchema.statics = {
	fetchAll: function(cb) {
		return this.find({}, cb);
	},
	fetchById: function(id, cb) {
		return this.findOne({_id: id}, cb);
	}
};

module.exports = CategorySchema;