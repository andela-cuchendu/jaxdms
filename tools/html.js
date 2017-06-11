import fs from 'fs';
import cheerio from 'cheerio';

fs.readFile('client/index.html', 'utf8', (err, markUp) => {
  if(err) {
    console.log(err, 'unable to read');
  }
  const $ = cheerio.load(markUp);
  $('head').prepend('<link rel="stylesheet" href="styles.css"/>');
  fs.writeFile('dist/index.html', $.html(), 'utf8', function (err) {
    if(err) {
      return console.log(err, 'unable to write');
    }
    console.log('Index written to /dist');
  });
});