var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var Promise = require('bluebird');
var mongoose= require('mongoose');
var Schema = mongoose.Schema;

var User;

var SchemaUsers = new Schema({
  // id: {type: Schema.Types.ObjectId},
 // will autoincrement work anyway?
  //what happens if a new user is created with a forced nonunique ID?
  username: {type: String, index: {unique: true}},
  password: String,
});



User = mongoose.model('User', SchemaUsers);
module.exports = User;

User.prototype.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    if(err){console.log(err);}
    callback(isMatch); //unlike soln lecture, does not change fn sig of cb
  });
};
//accessible from all instances of user collection.
//Otherwise, User.comparePassword

SchemaUsers.pre('save', function(next){
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      next();
    });
});

//****
/*
var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  initialize: function(){
    this.on('creating', this.hashPassword);
  },
});

module.exports = User;
*/
