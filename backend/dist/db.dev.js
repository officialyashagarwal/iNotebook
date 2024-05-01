"use strict";

var mongoose = require('mongoose');

var mongoURi = "mongodb://localhost:27017";

var connectToMongo = function connectToMongo() {
  mongoose.connect(mongoURi);
};

module.exports = connectToMongo;