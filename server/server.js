/* eslint-disable global-require */
import path from 'path';
import swagger from './routes/swagger';
import routes from './routes';

(function () {
  const express = require('express');
  const logger = require('morgan');
  const bodyParser = require('body-parser');
  const cors = require('cors');
  const dms = express();
  const compression = require('compression');

  dms.use(logger('dev'));
  dms.use(bodyParser.json());
  dms.use(bodyParser.urlencoded({
    extended: false,
  }));

  const isProduction = process.env.NODE_ENV === 'development';

  if (!isProduction) {
    require('dotenv').config();
  }

  dms.set('superSecret', process.env.SECRET);
  dms.use(compression());

  // configure app to use bodyParser()
  // this will let us get the data from a POST
  dms.use(bodyParser.urlencoded({
    extended: true,
  }));
  dms.use(bodyParser.json());

  // Enable CORS
  dms.use(cors({
    allowedHeaders: ['Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, x-access-token',
    ],
  }));

  dms.use(routes);

  if (process.env.NODE_ENV !== 'production') {
    dms.use('/dms', express.static(path.join(__dirname, './dms/')));
  } else {
    console.log('path', path.join(__dirname, '/dms/'));
    dms.use('/dms', express.static(
      path.join(__dirname, '/dms/')));
  }
  swagger(dms);

  module.exports = {
    api: dms,
  };
}());
