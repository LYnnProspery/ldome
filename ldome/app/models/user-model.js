var mongoose = require('mongoose');
var UserSchema = require('../Schemas/user-schema');
var User = mongoose.model('User', UserSchema);

module.exports = User;


