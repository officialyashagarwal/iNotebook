"use strict";

var express = require('express');

var router = express.Router();

var fetchUser = require('../middleware/fetchUser');

var Notes = require('../models/Notes');

var _require = require('express-validator'),
    body = _require.body,
    validationResult = _require.validationResult;

var bodyParser = require("body-parser");

router.use(bodyParser.json()); // Route : 1 : Get all the notes using : using GeT "/api/auth/fetchallnotes".login required.

router.get('/fetchallnotes', fetchUser, function _callee(req, res) {
  var notes;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Notes.find({
            user: req.user.id
          }));

        case 3:
          notes = _context.sent;
          res.json(notes);
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0.message);
          res.status(500).send("Error occurred");

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // Route : 2 : Add a new note using : POST  "/api/notes/addnote".login required.

router.post('/addnote', fetchUser, [body('title', 'Enter a title').isLength({
  min: 3
}), body('descryption', "Enter the descryption here").isLength({
  min: 5
})], function _callee2(req, res) {
  var _req$body, title, descryption, tag, errors, note, savedNote;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body = req.body, title = _req$body.title, descryption = _req$body.descryption, tag = _req$body.tag;
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 5:
          note = new Notes({
            title: title,
            descryption: descryption,
            tag: tag,
            user: req.user.id
          });
          _context2.next = 8;
          return regeneratorRuntime.awrap(note.save());

        case 8:
          savedNote = _context2.sent;
          res.json(savedNote);
          _context2.next = 16;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0.message);
          res.status(500).send("Error occurred");

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 12]]);
});
router.put('/updatenote/:id', fetchUser, function _callee3(req, res) {
  var _req$body2, title, descryption, tag, newNote, note, noted;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // Extract data from request body
          _req$body2 = req.body, title = _req$body2.title, descryption = _req$body2.descryption, tag = _req$body2.tag; // Create a new note object with extracted data

          newNote = {};

          if (title) {
            newNote.title = title;
          }

          if (descryption) {
            newNote.descryption = descryption;
          }

          if (tag) {
            newNote.tag = tag;
          } // Find a note to be updated


          _context3.next = 7;
          return regeneratorRuntime.awrap(Notes.findById(req.params.id));

        case 7:
          note = _context3.sent;

          if (!note) {
            res.status(404).send("Not Found");
          } // Check if the user is authorized to update the note


          if (!(note.user.toString() !== req.user.id)) {
            _context3.next = 11;
            break;
          }

          return _context3.abrupt("return", res.status(401).send("Unauthorized"));

        case 11:
          _context3.next = 13;
          return regeneratorRuntime.awrap(Notes.findByIdAndUpdate({
            _id: req.params.id
          }, {
            $set: newNote
          }, {
            "new": true
          }));

        case 13:
          noted = _context3.sent;
          // Send updated note as responses
          res.json(noted);

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  });
});
router["delete"]('/deletenote/:id', fetchUser, function _callee4(req, res) {
  var note;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Notes.findById(req.params.id));

        case 3:
          note = _context4.sent;

          if (!note) {
            res.status(404).send("Not Found");
          }

          ; // console.log({note})

          if (!(note.user.toString() !== req.user.id)) {
            _context4.next = 8;
            break;
          }

          return _context4.abrupt("return", res.status(401).send("Unauthorized"));

        case 8:
          _context4.next = 10;
          return regeneratorRuntime.awrap(Notes.findByIdAndDelete(req.params.id));

        case 10:
          note = _context4.sent;
          res.json({
            "Success ": "Note has been deleted"
          });
          _context4.next = 17;
          break;

        case 14:
          _context4.prev = 14;
          _context4.t0 = _context4["catch"](0);
          res.status(500).send("Internel Server error.");

        case 17:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 14]]);
});
module.exports = router;