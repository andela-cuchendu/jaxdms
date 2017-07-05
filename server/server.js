import path from 'path';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';
import swagger from './routes/swagger';
import routes from './routes';

(() => {
  const dms = express();
  dms.use(logger('dev'));
  dms.use(bodyParser.json());
  dms.use(bodyParser.urlencoded({
    extended: false,
  }));

  const isDevelopment = process.env.NODE_ENV === 'development';

  if (isDevelopment) {
    dotenv.config();
  }

  dms.set('superSecret', process.env.SECRET);
  dms.use(compression());

  dms.use(bodyParser.urlencoded({
    extended: true,
  }));
  dms.use(bodyParser.json());

  dms.use(cors({
    allowedHeaders: ['Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, x-access-token',
    ],
  }));

  dms.use(routes);

  if (process.env.NODE_ENV !== 'production') {
    dms.use('/dms', express.static(path.join(__dirname, './dms/')));
  } else {
    dms.use('/dms', express.static(
      path.join(__dirname, '/dms/')));
  }
  swagger(dms);

  module.exports = {
    api: dms,
  };
})();
