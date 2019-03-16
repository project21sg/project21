var mongoose = require("mongoose");
var mongooseOptions = { useMongoClient: true };

require("../models/Patient");

mongoose.connect("mongodb://localhost:27017", mongooseOptions, function(err) {
  if (err) {
    console.log(
      "Can't connect to mongodb:server @ localhost; retrying in 2 mins.."
    );
    console.log(err);

    setTimeout(() => {
      mongoose.connect("mongodb://localhost:27017", mongooseOptions, function(
        err
      ) {
        console.log("retried mongodb");
        if (err) {
          console.log(
            "Can't connect to mongodb:server; connecting to docker named mongo server"
          );
          console.log(err);
          mongoose.connect("mongodb://mongodb:27017", mongooseOptions, function(
            err
          ) {
            if (err) {
              console.log(
                "Can't connect to mongodb:server; is the database active and online?"
              );
            } else {
              console.log("local mongodb connected");
            }
          }); //assuming it's local dev, BAD style
        }
      }); //assuming it's local dev, BAD style
    }, 72000);
  }
});

module.exports = mongoose;
