(function() {
  'use strict';
  var express = require('express');
  var router = express.Router();

  // The home route
  router.get('/server', function(req, res) {
    res.send('Welcome to Document management system');
  });

  // Loads all the routes in the app to the router object
  router.use('/server', require('./userRoles'));
  router.use('/server', require('./user'));
  router.use('/server', require('./document'));

  module.exports = router;

}());
