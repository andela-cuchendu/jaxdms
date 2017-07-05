import express from 'express';
import path from 'path';
import open from 'open';
import { api } from '../server/server';

const port = process.env.PORT;
const app = express();

app.use(api);
app.use(express.static('dist'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, function(err) {
  if (err) {
  } else {
    open(`http://localhost:${port}`);
  }
});
