(function() {
  'use strict';


const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

  const dms = express();
const compression = require('compression');


dms.use(logger('dev'));
dms.use(bodyParser.json());
dms.use(bodyParser.urlencoded({
  extended: false
}));


const isProduction = process.env.NODE_ENV === 'development';

// Load the env variables only in DEV mode
if (!isProduction) {
  require('dotenv').load();
}

// @todo remove option
dms.set('superSecret', process.env.SECRET || 'thisishowwedoitiheadigonma');
// Require our routes into the application.

// compress all requests
dms.use(compression());



// configure app to use bodyParser()
// this will let us get the data from a POST
dms.use(bodyParser.urlencoded({
  extended: true
}));
dms.use(bodyParser.json());

// Enable CORS
dms.use(cors({
  allowedHeaders: ['Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-access-token']
}));

dms.use(require('./routes'));

//require('./routes')(server);
 //require('./routes');

// dms.use((err, req, res, next) => {
//   if (res.headersSent) {
//     return next(err);
//   }
//   res.status(err.status || 500).json({
//     error: err.message
//   });
// });

// // catch 404 errors
// dms.use((req, res) => {
//   const err = new Error('Not Found new disp');
//   res.status(404).json({
//     error: err.message
//   });
// });





  // // use morgan to log requests to the console
  // dms.use(morgan('dev'));
  // // support json encoded bodies
  // dms.use(bodyParser.json());
  // // support encoded bodies
  // dms.use(bodyParser.urlencoded({ extended: true }));
  // // Loads all the routes to the express object
  

  // // Connect to mongodb using mongoose
  // mongoose.connect(config.database, function(err) {
  //   if (err) {
  //     console.log('Error connecting to the database');
  //   } else {
  //     console.log('Connected to the database...');
  //   }
  // });

  module.exports = {
    api: dms
  };
}());
