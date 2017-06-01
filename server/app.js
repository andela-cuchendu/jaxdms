const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const compression = require('compression');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
let isProduction = process.env.NODE_ENV === 'development';

// Load the env variables only in DEV mode
if (!isProduction) {
  require('dotenv').load();
}

//@todo remove option
app.set('superSecret', process.env.SECRET || 'thisishowwedoitiheadigonma');
// Require our routes into the application.

  // compress all requests
  app.use(compression());

  // configure app to use bodyParser()
  // this will let us get the data from a POST
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

  // Enable CORS
  app.use(cors({
    allowedHeaders: ['Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token']
  }));


  require('./routes')(app);

  app.use((err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }
    res.status(err.status || 500).json({
      error: err.message
    });
  });

  // catch 404 errors
  app.use((req, res) => {
    let err = new Error('Not Found');
    res.status(404).json({
      error: err.message
    });
  });

module.exports = app;