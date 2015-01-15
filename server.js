var app = require('./server-config.js');


var port = process.env.port || 4568;
app.listen(port);

console.log('Server now listening on port ' + port);

// Mongo URI
// mongodb://MongoLab-v:poUVZNK8geNFwNKaZy0TDonuls4GaDXtX.S3apXh.wo-@ds052837.mongolab.com:52837/MongoLab-v
