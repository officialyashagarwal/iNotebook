"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var NotesSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    "default": "General"
  },
  date: {
    type: Date,
    "default": Date.now()
  }
});
module.exports = mongoose.model('notes', NotesSchema);