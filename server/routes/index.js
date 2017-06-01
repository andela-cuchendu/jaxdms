
(function() {
  'use strict';
  const express = require('express');
  const router = express.Router();

  router.get('/api', function(req, res) {
    res.send('Jax Document management system');
  });

  // Lists all routes
  router.use('/api', require('./users'));
  router.use('/api', require('./documents'));
  router.use('/api', require('./roles'));
  router.use('/api', require('./search'));

  module.exports = router;

}());