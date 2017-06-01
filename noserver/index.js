(function() {
  'use strict';

  require('dotenv').config({ silent: true });
  // Loads the custom string class functions
  require('./server/controllers/utils/stringClass');
  // Loads the custom Date class functions
  require('./server/controllers/utils/dateClass');
  // Loads dependency modules.
  const bodyParser = require('body-parser');
  const config = require('./config');
  const mongoose = require('mongoose');
  const express = require('express');
  const morgan = require('morgan');
  const dms = express();

  // use morgan to log requests to the console
  dms.use(morgan('dev'));
  // support json encoded bodies
  dms.use(bodyParser.json());
  // support encoded bodies
  dms.use(bodyParser.urlencoded({ extended: true }));
  // Loads all the routes to the express object
  dms.use(require('./server/routes'));

  // Connect to mongodb using mongoose
  mongoose.connect(config.database, function(err) {
    if (err) {
      console.log('Error connecting to the database');
    } else {
      console.log('Connected to the database...');
    }
  });

  module.exports = {
    api: dms
  };
}());