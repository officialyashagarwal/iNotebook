"use strict";

var connectToMongo = require('./db');

var express = require('express');

var cors = require('cors');

connectToMongo(); // const express = require('express')

var app = express();
var port = 5000;
app.use(cors());
app.use(express.json()); // Available routes

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.listen(port, function () {
  console.log("connected to server at http://localhost:".concat(port));
});