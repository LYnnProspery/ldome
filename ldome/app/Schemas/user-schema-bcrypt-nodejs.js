var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
	username: {
		unique: true,
		type: String
	},
	password: String,
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

UserSchema.pre('save', function (next) {
  var user = this;
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }
  var hash = bcrypt.hashSync(this.password);
  this.password = hash;
  next();
});
  
UserSchema.methods = {
  comparePass: function (_password, cb) {
    var hash = this.password;
    var isMatch = bcrypt.compareSync(_password, hash);
      cb(null, isMatch);
    }
};

UserSchema.methods = {
	comparePass: function(_password, cb) {
		//console.log('comparePass begin and this.password: ' + this.password + '|' + _password);

		bcrypt.compare(_password, this.password, function(err, isMatch) {
			if(err) {
				return cb(err);
			}
			//console.log('ismatch: ' + isMatch);
			return cb(null, isMatch);
		});
	}
};

UserSchema.statics = {
	fetchAll: function(cb) {
		return this.find({}, cb);
	},
	fetchById: function(id, cb) {
		return this.findOne({_id: id}, cb);
	}
};

module.exports = UserSchema;