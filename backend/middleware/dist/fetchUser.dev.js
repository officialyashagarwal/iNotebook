"use strict";

var jwt = require('jsonwebtoken');

var JWT_Secret = "PrashantisaGood$boy";

var fetchUser = function fetchUser(req, res, next) {
  // GET the User from the jwtToken and add id to the req object.
  var token = req.header('auth-token');

  if (!token) {
    res.status(401).send({
      error: "Please authenticate using a valid token1"
    });
  }

  try {
    var data = jwt.verify(token, JWT_Secret); // console.log(data);

    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({
      error: "Please authenticate using a valid token2"
    });
  }
};

module.exports = fetchUser;