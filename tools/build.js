import webpack from 'webpack';
import webpackProduction from '../webpack.config.prod';

process.env.NODE_ENV = 'production';
console.log('This might take time');
webpack(webpackProduction).run((error, stats) => {
  if(error) {
    console.log(error);
    return 1;
  }
  const json = stats.toJson();
  if(json.hasErrors) {
    return json.errors.map(errors => {
      console.log(errors)
    });
  }
  if(json.hasWarnings) {
    console.log('Warnings: ');
    return json.warnings.
      map(warning => {
        console.log(warning)
      });
  }
  console.log(`Stats : ${stats}`);
  console.log('Successfully compiled to /dist');
  return 0;
});