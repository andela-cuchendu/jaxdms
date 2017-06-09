import express from 'express';
import webpack from 'webpack';
import path from 'path';
import open from 'open';
import config from '../webpack.config.dev';
import { api } from '../server/server';

/* eslint-disable no-console */

const port = process.env.PORT;
const compiler = webpack(config);
const app = express();

app.use(api);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});