var crypto = require('crypto');
var Promise = require('bluebird');
var mongoose= require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Link;

var SchemaUrls = new Schema({
  // id: {type: Schema.Types.ObjectId},
  // id: ObjectId unnecessary
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number,
  createdAt: {type: Date, default: Date.now}
});
Link = mongoose.model('Link', SchemaUrls);

SchemaUrls.pre('save', function(next){
      var shasum = crypto.createHash('sha1');
      shasum.update(this.url);
      this.code = shasum.digest('hex').slice(0, 5);
      next();
    });

module.exports = Link;


//****
// var db = require('../config');
// var crypto = require('crypto');

// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
  // initialize:
// });

// module.exports = Link;
