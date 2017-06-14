
(function() {
  'use strict';
  const express = require('express');
  const router = express.Router();

  router.get('/api', function(req, res) {
    res.send('Jax Document management system');
  });

  // Lists all routes
  router.use('/api', require('./Users'));
  router.use('/api', require('./Documents'));
  router.use('/api', require('./Roles'));
  router.use('/api', require('./Search'));

  module.exports = router;

}());