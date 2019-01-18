var mongoose = require('mongoose');
var mongooseOptions = { useMongoClient: true };

require('../models/Patient');

mongoose.connect('mongodb://mongodb:27017', mongooseOptions, function(err) {
  if(err) {
    console.log("Can't connect to mongodb:server; connecting to local mongo server...")
    mongoose.connect('mongodb://localhost:27017', mongooseOptions); //assuming it's local dev, BAD style 
  }
  console.log("mongodb Connected.")
});

module.exports = mongoose;