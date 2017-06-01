module.exports = (app) => {

  // Lists all routes
  app.use('/api', require('./users'));
  app.use('/api', require('./documents'));
  app.use('/api', require('./roles'));
  app.use('/api', require('./search'));
};
