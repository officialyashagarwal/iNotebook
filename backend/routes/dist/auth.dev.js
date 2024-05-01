"use strict";

var express = require('express');

var router = express.Router();

var User = require('../models/User');

var _require = require('express-validator'),
    body = _require.body,
    validationResult = _require.validationResult;

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var fetchUser = require('../middleware/fetchUser');

var JWT_Secret = "PrashantisaGood$boy"; // Route : 1 : Create a user using : POST "api/auth". Doesnt require auth

router.post('/createuser', [body('name', "enter a valid name").isLength({
  min: 3
}), body('email', "Enter a valild email").isEmail(), body('password', "Should have minimum length of 3 characters.").isLength({
  min: 5
})], function _callee(req, res) {
  var errors, user, success, salt, secretPass, data, jwtToken;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // Check for validation errors
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 3:
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 6:
          user = _context.sent;
          success = false;

          if (!user) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            success: success,
            error: "Email already exists."
          }));

        case 10:
          _context.next = 12;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 12:
          salt = _context.sent;
          _context.next = 15;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, salt));

        case 15:
          secretPass = _context.sent;
          _context.next = 18;
          return regeneratorRuntime.awrap(User.create({
            name: req.body.name,
            password: secretPass,
            email: req.body.email
          }));

        case 18:
          user = _context.sent;
          data = {
            user: {
              id: user.id
            }
          }; // Generate JWT token

          success = true;
          jwtToken = jwt.sign(data, JWT_Secret);
          console.log({
            success: success,
            jwtToken: jwtToken
          });
          res.json({
            success: success,
            jwtToken: jwtToken
          });
          _context.next = 30;
          break;

        case 26:
          _context.prev = 26;
          _context.t0 = _context["catch"](3);
          console.log(_context.t0.message);
          res.status(500).send("Error occurred");

        case 30:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 26]]);
}); // Route : 2 : Authentication a User using : Post "/api/auth/login"

router.post('/login', [body('email', "Enter a valild email").isEmail(), body('password', "Enter the password").exists()], function _callee2(req, res) {
  var errors, _req$body, email, password, user, success, correctUser, data, jwtToken;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // Check for validation errors
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 3:
          // Check if user with email exists
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context2.prev = 4;
          _context2.next = 7;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 7:
          user = _context2.sent;
          success = false;

          if (user) {
            _context2.next = 11;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            success: success,
            error: "Please login with correct credentials"
          }));

        case 11:
          _context2.next = 13;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 13:
          correctUser = _context2.sent;

          if (correctUser) {
            _context2.next = 16;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            success: success,
            error: "Please login with correct credentials"
          }));

        case 16:
          data = {
            user: {
              id: user.id
            }
          }; // Generate JWT token

          jwtToken = jwt.sign(data, JWT_Secret);
          console.log(jwtToken);
          success = true;
          res.json({
            success: success,
            jwtToken: jwtToken
          });
          _context2.next = 27;
          break;

        case 23:
          _context2.prev = 23;
          _context2.t0 = _context2["catch"](4);
          console.log(_context2.t0.message);
          res.status(500).send("Error occurred");

        case 27:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[4, 23]]);
}); // Route : 3 : Get logged in User details : using Post "/api/auth/login".login required.

router.get('/getuser', fetchUser, function _callee3(req, res) {
  var userId, userDetails;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          // console.log(`Logged In User Details ${JSON.stringify(req.user)}`)
          userId = req.user.id;
          _context3.next = 4;
          return regeneratorRuntime.awrap(User.findById(userId).select("-password"));

        case 4:
          userDetails = _context3.sent;
          res.send(userDetails);
          _context3.next = 12;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0.message);
          res.status(500).send("Internal Server Error");

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
module.exports = router;